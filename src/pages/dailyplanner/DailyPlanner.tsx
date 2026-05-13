import React, { useState, useEffect, useCallback, useRef } from "react";
import debounce from "lodash/debounce";
import axios from "axios";
import { api } from "../../api/api";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import ApiError from "../../components/ApiError";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Heading, CheckSquare, Type, Trash2, Download,
  Calendar, Sparkles
} from "lucide-react";

type BlockType = "heading" | "check" | "note";

interface Block {
  id: number;
  type: BlockType;
  text?: string;
  done?: boolean;
}

const DailyPlanner: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [greeting, setGreeting] = useState("");
  const plannerRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("TOKEN");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  // Set greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  // Load planner data from server
  const loadPlanner = useCallback(async () => {
    try {
      const { data } = await axios.get(`${api}/api/dailyplanner/create/planner`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlocks(data.blocks || []);
    } catch (err) {
      setError("Unable to sync with server.");
    } finally {
      setLoading(false);
    }
  }, [token]);


  // Save planner data to server
  const savePlanner = async (updatedBlocks: Block[]) => {
    try {
      await axios.put(`${api}/api/dailyplanner/update/planner`,
        { blocks: updatedBlocks },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch {
      toast.error("Auto-save failed");
    }
  };

  const debouncedSave = useCallback(debounce(savePlanner, 800), []);

  useEffect(() => { loadPlanner(); }, [loadPlanner]);
  useEffect(() => { if (!loading) debouncedSave(blocks); }, [blocks, loading, debouncedSave]);

  const addBlock = (type: BlockType) => {
    const newBlock: Block = { id: Date.now(), type, text: "", done: false };
    setBlocks([...blocks, newBlock]);
    toast.success(`${type === "heading" ? "Heading" : type === "check" ? "Task" : "Note"} added`);
  };

  const updateText = (id: number, text: string) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, text } : b));
  };

  const toggleTodo = (id: number) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, done: !b.done } : b));
  };

  const downloadPDF = async () => {
    if (!plannerRef.current) return;
    setIsExporting(true);
    const toastId = toast.loading("Preparing PDF...");

    try {
      // Add a temporary class for PDF generation
      const element = plannerRef.current;
      const originalOverflow = element.style.overflow;
      element.style.overflow = 'visible';

      // Wait a bit for any pending changes
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#FFFFFF",
        logging: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        onclone: (clonedDoc, element) => {
          // Ensure all styles are applied in the cloned document
          const clonedElement = clonedDoc.body.querySelector('.planner-pdf-container');
          if (clonedElement) {
            // Fix any Tailwind styles that might not render correctly
            const checkboxes = clonedElement.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach((checkbox: any) => {
              if (checkbox.checked) {
                const parent = checkbox.parentElement;
                if (parent) {
                  parent.style.backgroundColor = '#10B981';
                  parent.style.borderColor = '#10B981';
                }
              }
            });
          }
        }
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Planner-${new Date().toISOString().slice(0, 10)}.pdf`);
      toast.success("Downloaded successfully!", { id: toastId });

      // Restore original overflow
      element.style.overflow = originalOverflow;
    } catch (error) {
      console.error("PDF Error:", error);
      toast.error("Failed to generate PDF", { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  const completedTasks = blocks.filter(b => b.type === "check" && b.done).length;
  const totalTasks = blocks.filter(b => b.type === "check").length;
  const progressPercent = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  // Get motivation message
  const getMotivationMessage = () => {
    if (progressPercent === 100) return "Perfect! You've completed all tasks! 🎉";
    if (progressPercent >= 75) return "Almost there! Keep going! 💪";
    if (progressPercent >= 50) return "Great progress! You're doing amazing! 🌟";
    if (progressPercent >= 25) return "Good start! Stay consistent! 📈";
    if (progressPercent > 0) return "Every step counts! You've got this! ✨";
    return "Start adding tasks to plan your day! 🚀";
  };

  if (loading) return <Loading />;
  if (error) return <ApiError error={error} />;

  return (
    <div className="min-h-screen font-['Inter',sans-serif] relative bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50 pointer-events-none" />

      {/* Cover Bar */}
      <div className="h-1 fixed top-[60px] left-0 right-0 z-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500" />

      {/* Container */}
      <div className="planner-pdf-container max-w-[1000px] mx-auto px-4 md:px-6 py-[100px] pb-16 relative z-10" ref={plannerRef}>
        <header className="mb-7 bg-white rounded-[28px] p-5 md:p-8 shadow-md border border-gray-100/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
          <div className="flex justify-between items-center flex-wrap gap-5 mb-5">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-gray-800 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                📋 Daily Planner
              </h1>
              <div className="text-sm text-gray-500 mt-1.5 flex items-center gap-1.5">
                <span>☀️</span>
                <span>{greeting}, let's plan your day!</span>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                className="flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50"
                onClick={downloadPDF}
                disabled={isExporting}
              >
                <Download size={16} />
                {isExporting ? "Exporting..." : "Download PDF"}
              </button>
              <button
                className="flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-xl text-sm font-semibold bg-white text-red-500 border border-red-100 transition-all duration-200 hover:bg-red-50 hover:border-red-300 hover:-translate-y-0.5"
                onClick={() => setBlocks([])}
              >
                <Trash2 size={16} />
                Clear All
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4 pt-5 border-t border-gray-100">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-sm text-gray-600 font-medium">
              <Calendar size={14} />
              <span>{today}</span>
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-300 relative overflow-hidden"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
                <span className="text-sm font-bold text-emerald-500 min-w-[50px]">
                  {completedTasks}/{totalTasks} Tasks
                </span>
                <div className="text-xs text-gray-500 flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-full">
                  <Sparkles size={12} />
                  <span>{getMotivationMessage()}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="flex items-center gap-2.5 flex-wrap p-4 md:p-6 bg-white border border-gray-200 rounded-2xl mb-6 shadow-sm" data-html2canvas-ignore>
          <span className="text-[11px] font-bold uppercase tracking-wide text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
            Quick Add
          </span>
          <button
            className="flex items-center gap-2 px-4 md:px-5 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:border-indigo-600 hover:-translate-y-0.5 hover:shadow-md"
            onClick={() => addBlock("heading")}
          >
            <Heading size={14} /> Heading
          </button>
          <button
            className="flex items-center gap-2 px-4 md:px-5 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:border-indigo-600 hover:-translate-y-0.5 hover:shadow-md"
            onClick={() => addBlock("check")}
          >
            <CheckSquare size={14} /> To-do
          </button>
          <button
            className="flex items-center gap-2 px-4 md:px-5 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:border-indigo-600 hover:-translate-y-0.5 hover:shadow-md"
            onClick={() => addBlock("note")}
          >
            <Type size={14} /> Text
          </button>
        </nav>

        <main className="flex flex-col gap-3">
          {blocks.length === 0 && (
            <div className="text-center py-[70px] px-5 bg-white rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
              <div className="mb-4 opacity-50">
                <Sparkles size={48} />
              </div>
              <p className="text-sm">✨ Start by adding a block above ✨</p>
              <small className="text-xs text-gray-300">Add headings, tasks, or notes to organize your day</small>
            </div>
          )}

          {blocks.map((block) => (
            <div key={block.id} className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl transition-all duration-200 hover:border-indigo-200 hover:shadow-md">
              <div className="flex gap-1.5 pt-1" data-html2canvas-ignore>
                <button
                  className="flex items-center justify-center w-8 h-8 bg-gray-50 border border-gray-200 rounded-lg transition-all duration-200 hover:bg-red-50 hover:border-red-300 hover:text-red-500 text-gray-400"
                  onClick={() => setBlocks(blocks.filter(b => b.id !== block.id))}
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                {block.type === "heading" ? (
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    className="text-xl md:text-2xl font-bold text-gray-800 px-3 py-2 outline-none rounded-xl transition-all duration-200 focus:bg-gray-50 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300"
                    data-placeholder="Heading 1"
                    onBlur={(e) => updateText(block.id, e.currentTarget.innerText)}
                    dangerouslySetInnerHTML={{ __html: block.text || "" }}
                  />
                ) : block.type === "check" ? (
                  <div className="flex items-center gap-3 py-1">
                    <label className="relative cursor-pointer shrink-0 group">
                      <input
                        type="checkbox"
                        checked={block.done}
                        onChange={() => toggleTodo(block.id)}
                        className="peer absolute opacity-0 w-0 h-0"
                      />
                      <div className="flex items-center justify-center w-6 h-6 border-2 rounded-lg transition-all duration-200 border-gray-300 bg-white peer-checked:bg-emerald-500 peer-checked:border-emerald-500 group-hover:border-indigo-600">
                        {block.done && (
                          <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </label>
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      className={`flex-1 text-sm md:text-base text-gray-700 px-2.5 py-1.5 outline-none rounded-lg transition-all duration-200 focus:bg-gray-50 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300 ${block.done ? 'line-through text-gray-400' : ''}`}
                      data-placeholder="Write a task..."
                      onBlur={(e) => updateText(block.id, e.currentTarget.innerText)}
                      dangerouslySetInnerHTML={{ __html: block.text || "" }}
                    />
                  </div>
                ) : (
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    className="text-sm md:text-base text-gray-600 leading-relaxed px-3 py-2 outline-none rounded-xl transition-all duration-200 focus:bg-gray-50 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300"
                    data-placeholder="Write your notes here..."
                    onBlur={(e) => updateText(block.id, e.currentTarget.innerText)}
                    dangerouslySetInnerHTML={{ __html: block.text || "" }}
                  />
                )}
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* Custom animations and styles */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        /* Ensure proper checkbox rendering in PDF */
        .planner-pdf-container input[type="checkbox"]:checked + div {
          background-color: #10B981 !important;
          border-color: #10B981 !important;
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #F3F4F6;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #D1D5DB;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #9CA3AF;
        }
      `}</style>
    </div>
  );
};

export default DailyPlanner;