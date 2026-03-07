import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import axios from "axios";
import { api } from "../../api/api";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import ApiError from "../../components/ApiError";

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
  const token = localStorage.getItem("TOKEN");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

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
    const newBlock: Block = {
      id: Date.now(),
      type,
      text: "",
      done: false,
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateText = (id: number, text: string) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, text } : b));
  };

  const toggleTodo = (id: number) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, done: !b.done } : b));
  };

  if (loading) return <Loading />;
  if (error) return <ApiError error={error} />;

  return (
    <div className="planner-page">
      <div className="planner-cover" />
      <div className="planner-container">
        <header className="planner-header">
          <div className="title-row">
            <h1>📋 Daily Planner</h1>
            <button className="delete-all-btn" onClick={() => setBlocks([])}>Clear All</button>
          </div>
          <div className="meta-row">
            <span>{today}</span>
            <span>•</span>
            <span style={{ color: "#00a2ff" }}>
              {blocks.filter(b => b.type === "check" && b.done).length} / {blocks.filter(b => b.type === "check").length} tasks
            </span>
          </div>
        </header>

        <nav className="notion-toolbar">
          <span className="add-label">Quick Add</span>
          <button className="picker-btn" onClick={() => addBlock("heading")}><span>H</span> Heading</button>
          <button className="picker-btn" onClick={() => addBlock("check")}><span>☑</span> To-do</button>
          <button className="picker-btn" onClick={() => addBlock("note")}><span>¶</span> Text</button>
        </nav>

       {/* // Inside your DailyPlanner component map function: */}
        <main className="planner-editor">
          {blocks.map((block) => (
            <div key={block.id} className="block-row-group">
              <div className="side-controls">
                {/* <button className="control-btn drag-handle">⠿</button> */}
                <button
                  className="control-btn delete-btn"
                  onClick={() => setBlocks(blocks.filter(b => b.id !== block.id))}
                >
                  <span className="icon">✕</span>
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
                  >{block.text}</div>
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
                      data-placeholder="To-do"
                      onBlur={(e) => updateText(block.id, e.currentTarget.innerText)}
                    >{block.text}</div>
                  </div>
                ) : (
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    className="note-block"
                    data-placeholder="Type '/' for commands..."
                    onBlur={(e) => updateText(block.id, e.currentTarget.innerText)}
                  >{block.text}</div>
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