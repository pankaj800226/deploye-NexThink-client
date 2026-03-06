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
  sectionId: number;
}

const Routine: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("TOKEN");

  const [currentSectionId, setCurrentSectionId] = useState<number>(
    () => Date.now()
  );

  /* ================= LOAD ================= */

  useEffect(() => {
    const loadRoutine = async () => {
      try {
        const { data } = await axios.get(
          `${api}/api/dailyplanner/create/planner`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const loadedBlocks = data.blocks || [];
        setBlocks(loadedBlocks);

        const lastDivider = loadedBlocks.findLast(
          (b: Block) => b.type === "divider"
        );

        if (lastDivider) setCurrentSectionId(lastDivider.id);
      } catch {
        toast.error("Failed to load routine");
        setError("Failed to load routine");
      } finally {
        setLoading(false);
      }
    };

    loadRoutine();
  }, [token]);

  /* ================= SAVE ================= */

  const saveRoutine = async (blocks: Block[]) => {
    try {
      await axios.put(
        `${api}/api/dailyplanner/update/planner`,
        { blocks },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch {
      toast.error("Failed to save routine");
      setError("Failed to save routine");
    }
  };

  const debouncedSave = useCallback(
    debounce((b: Block[]) => saveRoutine(b), 700),
    []
  );

  useEffect(() => {
    return () => debouncedSave.cancel();
  }, [debouncedSave]);

  useEffect(() => {
    if (!loading) debouncedSave(blocks);
  }, [blocks, loading, debouncedSave]);

  /* ================= STATE HELPERS ================= */

  const updateBlock = (id: number, payload: Partial<Block>) => {
    setBlocks(prev =>
      prev.map(block =>
        block.id === id ? { ...block, ...payload } : block
      )
    );
  };

  const toggleCheck = (id: number) => {
    const block = blocks.find(b => b.id === id);
    if (!block) return;

    updateBlock(id, { done: !block.done });
  };

  const editBlock = (id: number, text: string) => {
    updateBlock(id, { text });
  };

  /* ================= ADD BLOCK ================= */

  const addBlock = (type: BlockType) => {
    setBlocks(prev => {
      const newId = Date.now();

      let sectionId = currentSectionId;

      if (type === "divider") {
        sectionId = newId;
        setCurrentSectionId(newId);
      }

      return [
        ...prev,
        {
          id: newId,
          type,
          text:
            type === "heading"
              ? "New Section"
              : type === "check"
              ? "New Item"
              : type === "note"
              ? "New Note"
              : "",
          done: false,
          sectionId
        }
      ];
    });
  };

  const deleteBlock = (id: number) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
  };

  /* ================= DELETE ROUTINE ================= */

  const deleteRoutine = async () => {
    try {
      await axios.delete(`${api}/api/dailyplanner/delete/planner`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBlocks([]);
      toast.success("Routine deleted");
    } catch {
      toast.error("Failed to delete routine");
      setError("Failed to delete routine");
    }
  };

  /* ================= GROUPING ENGINE ================= */

  const groupedBlocks = blocks.reduce(
    (acc: Record<number, Block[]>, block) => {
      if (!acc[block.sectionId]) acc[block.sectionId] = [];
      acc[block.sectionId].push(block);
      return acc;
    },
    {}
  );

  /* ================= UI ================= */

  if (loading) return <Loading />;
  if (error) return <ApiError error={error} />;

  return (
    <div className="routine">
      <div className="routine__header">
        <h1>My Planner</h1>

        <Button color="error" variant="outlined" onClick={deleteRoutine}>
          Delete Planner
        </Button>
      </div>

      <div className="routine__toolbar">
        <button onClick={() => addBlock("heading")}>+ Heading</button>
        <button onClick={() => addBlock("check")}>+ Checklist</button>
        <button onClick={() => addBlock("note")}>+ Note</button>
        <button onClick={() => addBlock("divider")}>+ Divider</button>
      </div>

      <div className="routine__editor">
        {Object.values(groupedBlocks).map(section => (
          <div key={section[0].sectionId} className="routine__section">
            {section.map(block => {
              if (block.type === "divider")
                return <hr key={block.id} />;

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

              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Routine;