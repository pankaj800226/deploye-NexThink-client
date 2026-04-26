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
      const canvas = await html2canvas(plannerRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#FFFFFF",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Planner-${new Date().toISOString().slice(0, 10)}.pdf`);
      toast.success("Downloaded successfully!", { id: toastId });
    } catch (error) {
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
    <div className="daily-planner">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .daily-planner {
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          position: relative;
        }

        /* Decorative Background Elements */
        .daily-planner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 400px;
      
          pointer-events: none;
        }

        /* Cover Bar */
        .planner-cover {
          height: 4px;
          background: linear-gradient(90deg, #4F46E5, #7C3AED, #EC4899, #F59E0B);
          position: fixed;
          top: 60px;
          left: 0;
          right: 0;
          z-index: 10;
        }

        /* Container */
        .planner-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 100px 24px 60px;
          position: relative;
          z-index: 1;
        }

        /* Header Styles */
        .planner-header {
          margin-bottom: 28px;
          background: white;
          border-radius: 28px;
          padding: 28px 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(229, 231, 235, 0.8);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .planner-header:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
        }

        .title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 20px;
        }

        .title-left h1 {
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(135deg, #1F2937, #4F46E5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .greeting-text {
          font-size: 14px;
          color: #6B7280;
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .greeting-text::before {
          content: '☀️';
        }

        .header-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .download-btn, .delete-all-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 14px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          border: none;
          font-family: 'Inter', sans-serif;
        }

        .download-btn {
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: white;
          box-shadow: 0 2px 6px rgba(79, 70, 229, 0.2);
        }

        .download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(79, 70, 229, 0.3);
        }

        .delete-all-btn {
          background: white;
          color: #EF4444;
          border: 1px solid #FEE2E2;
        }

        .delete-all-btn:hover {
          background: #FEF2F2;
          border-color: #FCA5A5;
          transform: translateY(-2px);
        }

        /* Meta Row */
        .meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          padding-top: 20px;
          border-top: 1px solid #F3F4F6;
        }

        .date-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #F9FAFB;
          border-radius: 14px;
          font-size: 13px;
          color: #4B5563;
          font-weight: 500;
        }

        .progress-section {
          flex: 1;
          min-width: 200px;
        }

        .progress-stats {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .progress-bar-container {
          flex: 1;
          height: 8px;
          background: #F3F4F6;
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #10B981, #34D399);
          border-radius: 10px;
          transition: width 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .progress-bar-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .progress-text {
          font-size: 13px;
          font-weight: 700;
          color: #10B981;
          min-width: 50px;
        }

        .motivation-text {
          font-size: 12px;
          color: #6B7280;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: #FEF3C7;
          border-radius: 20px;
        }

        /* Toolbar */
        .notion-toolbar {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          padding: 16px 24px;
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 24px;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .add-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #9CA3AF;
          background: #F9FAFB;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .picker-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          font-size: 13px;
          font-weight: 500;
          color: #4B5563;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .picker-btn:hover {
          background: #F9FAFB;
          border-color: #4F46E5;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.1);
        }

        /* Editor */
        .planner-editor {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .empty-hint {
          text-align: center;
          padding: 70px 20px;
          background: white;
          border-radius: 24px;
          border: 2px dashed #E5E7EB;
          color: #9CA3AF;
        }

        .empty-icon {
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-hint p {
          font-size: 14px;
        }

        .empty-hint small {
          font-size: 12px;
          color: #D1D5DB;
        }

        /* Block Row */
        .block-row-group {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 20px;
          transition: all 0.2s ease;
        }

        .block-row-group:hover {
          border-color: #C7D2FE;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        }

        .side-controls {
          display: flex;
          gap: 6px;
          padding-top: 4px;
        }

        .control-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #9CA3AF;
        }

        .control-btn:hover {
          background: #FEF2F2;
          border-color: #FCA5A5;
          color: #EF4444;
        }

        .block-content {
          flex: 1;
          min-width: 0;
        }

        /* Heading Block */
        .heading-block {
          font-size: 22px;
          font-weight: 700;
          color: #1F2937;
          padding: 8px 12px;
          border: none;
          outline: none;
          width: 100%;
          background: transparent;
          border-radius: 12px;
          transition: background 0.2s;
        }

        .heading-block:focus {
          background: #F9FAFB;
        }

        .heading-block:empty::before {
          content: attr(data-placeholder);
          color: #D1D5DB;
        }

        /* Todo Item */
        .todo-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 4px 0;
        }

        .checkbox-container {
          position: relative;
          cursor: pointer;
          flex-shrink: 0;
        }

        .checkbox-container input {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }

        .checkmark {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border: 2px solid #D1D5DB;
          border-radius: 8px;
          background: white;
          transition: all 0.2s ease;
        }

        .checkbox-container:hover .checkmark {
          border-color: #4F46E5;
          background: #EEF2FF;
        }

        .checkbox-container input:checked + .checkmark {
          background: #10B981;
          border-color: #10B981;
        }

        .checkbox-container input:checked + .checkmark::after {
          content: "✓";
          color: white;
          font-size: 14px;
          font-weight: bold;
        }

        .todo-text {
          flex: 1;
          font-size: 15px;
          color: #374151;
          padding: 6px 10px;
          border: none;
          outline: none;
          background: transparent;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .todo-text.done {
          text-decoration: line-through;
          color: #9CA3AF;
        }

        .todo-text:focus {
          background: #F9FAFB;
        }

        .todo-text:empty::before {
          content: attr(data-placeholder);
          color: #D1D5DB;
        }

        /* Note Block */
        .note-block {
          font-size: 15px;
          color: #4B5563;
          line-height: 1.6;
          padding: 8px 12px;
          border: none;
          outline: none;
          width: 100%;
          background: transparent;
          border-radius: 12px;
          transition: background 0.2s;
        }

        .note-block:focus {
          background: #F9FAFB;
        }

        .note-block:empty::before {
          content: attr(data-placeholder);
          color: #D1D5DB;
        }

        /* Scrollbar */
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

        /* Responsive Design */
        @media (max-width: 768px) {
          .planner-container {
            padding: 80px 16px 40px;
          }

          .planner-header {
            padding: 20px;
          }

          .title-left h1 {
            font-size: 26px;
          }

          .header-actions {
            width: 100%;
          }

          .download-btn, .delete-all-btn {
            flex: 1;
            justify-content: center;
          }

          .meta-row {
            flex-direction: column;
            align-items: stretch;
          }

          .progress-stats {
            flex-direction: column;
          }

          .notion-toolbar {
            padding: 14px 18px;
          }

          .picker-btn {
            padding: 6px 14px;
            font-size: 12px;
          }

          .heading-block {
            font-size: 18px;
          }
        }

        @media (max-width: 480px) {
          .planner-container {
            padding: 70px 12px 30px;
          }

          .planner-header {
            padding: 16px;
          }

          .title-left h1 {
            font-size: 22px;
          }

          .greeting-text {
            font-size: 12px;
          }

          .notion-toolbar {
            gap: 8px;
          }

          .picker-btn {
            padding: 5px 10px;
            font-size: 11px;
          }

          .add-label {
            font-size: 10px;
          }

          .block-row-group {
            padding: 8px;
          }

          .control-btn {
            width: 28px;
            height: 28px;
          }

          .heading-block {
            font-size: 16px;
            padding: 6px 8px;
          }

          .todo-text, .note-block {
            font-size: 13px;
          }

          .checkmark {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>

      <div className="planner-cover" />

      <div className="planner-container" ref={plannerRef}>
        <header className="planner-header">
          <div className="title-row">
            <div className="title-left">
              <h1>📋 Daily Planner</h1>
              <div className="greeting-text">{greeting}, let's plan your day!</div>
            </div>
            <div className="header-actions">
              <button className="download-btn" onClick={downloadPDF} disabled={isExporting}>
                <Download size={16} />
                {isExporting ? "Exporting..." : "Download PDF"}
              </button>
              <button className="delete-all-btn" onClick={() => setBlocks([])}>
                <Trash2 size={16} />
                Clear All
              </button>
            </div>
          </div>

          <div className="meta-row">
            <div className="date-badge">
              <Calendar size={14} />
              <span>{today}</span>
            </div>
            <div className="progress-section">
              <div className="progress-stats">
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
                </div>
                <span className="progress-text">
                  {completedTasks}/{totalTasks} Tasks
                </span>
                <div className="motivation-text">
                  <Sparkles size={12} />
                  <span>{getMotivationMessage()}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="notion-toolbar" data-html2canvas-ignore>
          <span className="add-label">Quick Add</span>
          <button className="picker-btn" onClick={() => addBlock("heading")}>
            <Heading size={14} /> Heading
          </button>
          <button className="picker-btn" onClick={() => addBlock("check")}>
            <CheckSquare size={14} /> To-do
          </button>
          <button className="picker-btn" onClick={() => addBlock("note")}>
            <Type size={14} /> Text
          </button>
        </nav>

        <main className="planner-editor">
          {blocks.length === 0 && (
            <div className="empty-hint">
              <div className="empty-icon">
                <Sparkles size={48} />
              </div>
              <p>✨ Start by adding a block above ✨</p>
              <small>Add headings, tasks, or notes to organize your day</small>
            </div>
          )}

          {blocks.map((block) => (
            <div key={block.id} className="block-row-group">
              <div className="side-controls" data-html2canvas-ignore>
                <button className="control-btn" onClick={() => setBlocks(blocks.filter(b => b.id !== block.id))}>
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="block-content">
                {block.type === "heading" ? (
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    className="heading-block"
                    data-placeholder="Heading 1"
                    onBlur={(e) => updateText(block.id, e.currentTarget.innerText)}
                    dangerouslySetInnerHTML={{ __html: block.text || "" }}
                  />
                ) : block.type === "check" ? (
                  <div className="todo-item">
                    <label className="checkbox-container">
                      <input type="checkbox" checked={block.done} onChange={() => toggleTodo(block.id)} />
                      <span className="checkmark"></span>
                    </label>
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      className={`todo-text ${block.done ? 'done' : ''}`}
                      data-placeholder="Write a task..."
                      onBlur={(e) => updateText(block.id, e.currentTarget.innerText)}
                      dangerouslySetInnerHTML={{ __html: block.text || "" }}
                    />
                  </div>
                ) : (
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    className="note-block"
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
    </div>
  );
};

export default DailyPlanner;