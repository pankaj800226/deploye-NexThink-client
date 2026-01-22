import { Create, CropSquare, Delete } from "@mui/icons-material";
import { useRef, useState, useEffect, type JSX, type PointerEvent, type KeyboardEvent } from "react";
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { FaEraser } from "react-icons/fa6";

type Tool = "pencil" | "rect" | "text" | "eraser";
type Point = { x: number; y: number };

type PencilOrEraserShape = { type: "pencil" | "eraser"; points: Point[]; color: string; lineWidth: number };
type RectShape = { type: "rect"; x: number; y: number; width: number; height: number; color: string; lineWidth: number };
type TextShape = { type: "text"; x: number; y: number; text: string; color: string; fontSize: number; fontFamily: string };

type Shape = PencilOrEraserShape | RectShape | TextShape;

type TextInputState = { show: boolean; x: number; y: number; value: string };

const Think_Drow = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [tool, setTool] = useState<Tool>("pencil");
  const [color, setColor] = useState<string>("#000000");
  const [lineWidth, setLineWidth] = useState<number>(2);
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [fontSize, setFontSize] = useState<number>(18); // NEW fontSize state
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [start, setStart] = useState<Point>({ x: 0, y: 0 });
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [textInput, setTextInput] = useState<TextInputState>({ show: false, x: 0, y: 0, value: "" });
  const [draggingTextIndex, setDraggingTextIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<Point>({ x: 0, y: 0 });

  const colors = ["#000000", "#FF3B30", "#FF9500", "#FFCC00", "#4CD964", "#5AC8FA", "#0579FF", "#5856D6", "#FF2D55"];

  useEffect(() => {
    const canvas = canvasRef.current!;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const ctx = canvas.getContext("2d")!;
    ctx.lineCap = "round";
    ctxRef.current = ctx;

    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const ctx = ctxRef.current!;
    const canvas = canvasRef.current!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach(shape => {
      ctx.save();

      if (shape.type === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = shape.lineWidth;
        ctx.beginPath();
        shape.points.forEach((p: Point, i: number) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
        ctx.stroke();
        ctx.restore();
        return;
      }

      ctx.globalCompositeOperation = "source-over";

      if (shape.type === "pencil") {
        ctx.strokeStyle = shape.color;
        ctx.lineWidth = shape.lineWidth;
        ctx.beginPath();
        shape.points.forEach((p: Point, i: number) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
        ctx.stroke();
      }

      if (shape.type === "rect") {
        ctx.strokeStyle = shape.color;
        ctx.lineWidth = shape.lineWidth;
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      }

      if (shape.type === "text") {
        ctx.fillStyle = shape.color;
        ctx.font = `${shape.fontSize}px ${shape.fontFamily}`;
        ctx.fillText(shape.text, shape.x, shape.y);
      }

      ctx.restore();
    });
  }, [shapes]);

  const getPos = (e: PointerEvent<HTMLCanvasElement>): Point => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerDown = (e: PointerEvent<HTMLCanvasElement>): void => {
    e.preventDefault();
    const pos: Point = getPos(e);

    const textIndex: number = shapes.findIndex((s): s is TextShape =>
      s.type === "text" && pos.x >= s.x && pos.x <= s.x + (s.text.length * 10) && pos.y <= s.y && pos.y >= s.y - 18
    );

    if (textIndex !== -1) {
      setDraggingTextIndex(textIndex);
      const s = shapes[textIndex] as TextShape;
      setDragOffset({ x: pos.x - s.x, y: pos.y - s.y });
      return;
    }

    if (tool === "text") {
      setTextInput({ show: true, x: pos.x, y: pos.y, value: "" });
      return;
    }

    setIsDrawing(true);
    setStart(pos);

    if (tool === "pencil" || tool === "eraser") {
      setShapes(prev => [...prev, { type: tool, points: [pos], color, lineWidth: tool === "eraser" ? 24 : lineWidth }]);
    }
  };

  const handlePointerMove = (e: PointerEvent<HTMLCanvasElement>): void => {
    const pos: Point = getPos(e);

    if (draggingTextIndex !== null) {
      setShapes(prev => {
        const newShapes: Shape[] = [...prev];
        const s = newShapes[draggingTextIndex];
        if (s.type === "text") {
          s.x = pos.x - dragOffset.x;
          s.y = pos.y - dragOffset.y;
        }
        return newShapes;
      });
      return;
    }

    if (!isDrawing) return;

    if (tool === "pencil" || tool === "eraser") {
      setShapes(prev => {
        const last = prev[prev.length - 1] as PencilOrEraserShape;
        last.points.push(pos);
        return [...prev.slice(0, -1), last];
      });
    }
  };

  const handlePointerUp = (e: PointerEvent<HTMLCanvasElement>): void => {
    if (draggingTextIndex !== null) {
      setDraggingTextIndex(null);
      return;
    }
    if (!isDrawing) return;
    setIsDrawing(false);

    if (tool === "rect") {
      const end: Point = getPos(e);
      setShapes(prev => [...prev, { type: "rect", x: start.x, y: start.y, width: end.x - start.x, height: end.y - start.y, color, lineWidth }]);
    }
  };

  const handleTextKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      if (textInput.value.trim()) {
        setShapes(prev => [...prev, { type: "text", x: textInput.x, y: textInput.y, text: textInput.value, color, fontSize, fontFamily }]);
      }
      setTextInput({ show: false, x: 0, y: 0, value: "" });
    }
  };

  return (
    <>
      {/* TOOLBAR */}
      <div style={{
        position: "fixed",
        top: 12,
        left: "50%",
        transform: "translateX(-50%)",
        background: theme === "light" ? "#fff" : "#1e1e1e",
        padding: 12,
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        gap: 12,
        boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        zIndex: 20,
        maxWidth: "95vw",
        overflowX: "auto",
        whiteSpace: "nowrap"
      }}>
        {/* TOOL BUTTONS */}
        <ToolBtn active={tool === "pencil"} onClick={() => setTool("pencil")}><Create /></ToolBtn>
        <ToolBtn active={tool === "rect"} onClick={() => setTool("rect")}><CropSquare /></ToolBtn>
        <ToolBtn active={tool === "text"} onClick={() => setTool("text")}><FormatColorTextIcon /></ToolBtn>
        <ToolBtn active={tool === "eraser"} onClick={() => setTool("eraser")}><FaEraser /></ToolBtn>

        {/* COLOR PALETTE */}
        <div style={{ display: "flex", gap: 6 }}>
          {colors.map(c => (
            <div key={c} onClick={() => setColor(c)} style={{
              width: 24, height: 24, borderRadius: "50%", background: c,
              border: c === color ? "3px solid #6366f1" : "1px solid #aaa",
              cursor: "pointer"
            }} />
          ))}
        </div>

        {/* LINE WIDTH */}
        <input type="range" min={1} max={40} value={lineWidth} onChange={e => setLineWidth(Number(e.target.value))} style={{ cursor: "pointer" }} />

        {/* FONT SIZE */}
        <input type="number" min={8} max={72} value={fontSize} onChange={e => setFontSize(Number(e.target.value))} style={{ width: 60, padding: 4, borderRadius: 6 }} />

        {/* FONT FAMILY */}
        <select value={fontFamily} onChange={e => setFontFamily(e.target.value)} style={{ padding: "4px 6px", borderRadius: 6, cursor: "pointer" }}>
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
        </select>

        {/* THEME TOGGLE */}
        <ToolBtn onClick={() => setTheme(theme === "light" ? "dark" : "light")}>🌗</ToolBtn>

        {/* CLEAR CANVAS */}
        <ToolBtn onClick={() => setShapes([])}><Delete /></ToolBtn>
      </div>

      {/* CANVAS */}
      <canvas ref={canvasRef} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}
        style={{ background: theme === "light" ? "#f5f5f5" : "#111", touchAction: "none" }}
      />

      {/* TEXT INPUT */}
      {textInput.show && (
        <input autoFocus value={textInput.value} onChange={e => setTextInput({ ...textInput, value: e.target.value })}
          onKeyDown={handleTextKeyDown}
          style={{ position: "fixed", top: textInput.y, left: textInput.x, fontSize, fontFamily, padding: 4, zIndex: 30 }}
        />
      )}
    </>
  );
}

// TOOL BUTTON COMPONENT
function ToolBtn({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick?: () => void }): JSX.Element {
  return (
    <button onClick={onClick} style={{
      padding: "6px 10px", borderRadius: 10, border: "none", cursor: "pointer",
      background: active ? "#6366f1" : "transparent", color: active ? "#fff" : "inherit", fontSize: 16
    }}>
      {children}
    </button>
  );
}
export default Think_Drow