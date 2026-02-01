import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import axios from "axios";
import { api } from "../../api/api";
import toast from "react-hot-toast";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Loading from "../../components/Loading";
import ApiError from "../../components/ApiError";

type BlockType = "heading" | "check" | "note" | "divider";

interface Block {
  id: number;
  type: BlockType;
  text?: string;
  done?: boolean;
}

const Routine: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("TOKEN");
  const [error, setError] = useState("");

  /* ---------------- LOAD ---------------- */
  useEffect(() => {
    const loadRoutine = async () => {
      try {
        const { data } = await axios.get(`${api}/api/routen/createRoutine`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBlocks(data.blocks || []);
      } catch {
        toast.error("Failed to load routine");
        setError("Failed to load routine");
      } finally {
        setLoading(false);
      }
    };

    loadRoutine();
  }, [token]);

  /* ---------------- SAVE ---------------- */
  const saveRoutine = async (blocks: Block[]) => {
    try {
      await axios.put(
        `${api}/api/routen/routine`,
        { blocks },
        { headers: { Authorization: `Bearer ${token}` } }
      );

    } catch (error) {
      console.log(error);
      toast.error("Failed to save routine");
      setError("Failed to load routine");

    }

  };

  const debouncedSave = useCallback(
    // debounce((b: Block[]) => saveRoutine(b), 700),
    debounce((b: Block[]) => { saveRoutine(b); }, 700), []

  );

  useEffect(() => { return () => { debouncedSave.cancel(); }; }, [debouncedSave]);

  useEffect(() => { if (!loading) { debouncedSave(blocks); } }, [blocks, loading, debouncedSave]);

  /* ---------------- ACTIONS ---------------- */
  const toggleCheck = (id: number) =>
    setBlocks(prev =>
      prev.map(b => (b.id === id ? { ...b, done: !b.done } : b))
    );

  const editBlock = (id: number, text: string) =>
    setBlocks(prev =>
      prev.map(b => (b.id === id ? { ...b, text } : b))
    );

  const addBlock = (type: BlockType) =>
    setBlocks(prev => [
      ...prev,
      {
        id: Date.now(),
        type,
        text: type === "heading" ? "New Section" : "New Item",
        done: false,
      },
    ]);

  const deleteBlock = (id: number) =>
    setBlocks(prev => prev.filter(b => b.id !== id));


  const deleteRoutine = async () => {
    try {
      await axios.delete(`${api}/api/routen/routine`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBlocks([]);
      toast.success("Routine deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete routine");
      setError("Failed to load routine");

    }

  };

  /* ---------------- UI ---------------- */

  if (loading) return <Loading />;
  if (error) return <ApiError error={error} />;

  return (
    <div className="routine">
      {/* Header */}
      <div className="routine__header">
        <h1>My Routine</h1>

        <Button color="error" variant="outlined" onClick={deleteRoutine}>
          Delete Routine
        </Button>
      </div>

      {/* Toolbar */}
      <div className="routine__toolbar">
        <button onClick={() => addBlock("heading")}>+ Heading</button>
        <button onClick={() => addBlock("check")}>+ Checklist</button>
        <button onClick={() => addBlock("note")}>+ Note</button>
        <button onClick={() => addBlock("divider")}>+ Divider</button>
      </div>

      {/* Editor */}
      <div className="routine__editor">
        {blocks.length === 0 ? (
          <p className="routine__empty">
            Your routine is empty. Add blocks above.
          </p>
        ) : (
          blocks.map(block => {
            if (block.type === "heading")
              return (
                <pre
                  key={block.id}
                  contentEditable
                  suppressContentEditableWarning
                  className="routine__heading"
                  onBlur={e =>
                    editBlock(block.id, e.currentTarget.innerText)
                  }
                >
                  {block.text}
                </pre>
              );

            if (block.type === "check")
              return (
                <div key={block.id} className="routine__check">
                  <input
                    type="checkbox"
                    checked={block.done}
                    onChange={() => toggleCheck(block.id)}
                  />

                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className={block.done ? "done" : ""}
                    onBlur={e =>
                      editBlock(block.id, e.currentTarget.innerText)
                    }
                  >
                    {block.text}
                  </span>

                  <IconButton
                    size="small"
                    onClick={() => deleteBlock(block.id)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
              );

            if (block.type === "note")
              return (
                <p
                  key={block.id}
                  contentEditable
                  suppressContentEditableWarning
                  className="routine__note"
                  onBlur={e =>
                    editBlock(block.id, e.currentTarget.innerText)
                  }
                >
                  {block.text}
                </p>
              );

            if (block.type === "divider")
              return <hr key={block.id} />;

            return null;
          })
        )}
      </div>
    </div>
  );
};

export default Routine;
