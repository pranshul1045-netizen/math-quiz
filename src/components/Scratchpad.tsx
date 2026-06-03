/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Pencil, Eraser, Trash2, X, Maximize2, Minimize2, Edit2 } from "lucide-react";

interface ScratchpadProps {
  onClose?: () => void;
  isOpen: boolean;
}

export default function Scratchpad({ onClose, isOpen }: ScratchpadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#2563eb"); // Default blue
  const [lineWidth, setLineWidth] = useState(3);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [isMinimized, setIsMinimized] = useState(false);

  // Resize canvas handler
  useEffect(() => {
    if (!isOpen || isMinimized) return;

    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const container = canvas.parentElement;
      if (!container) return;

      // Maintain drawing when resizing (optional, but clean clear is fine)
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight || 350;

      const context = canvas.getContext("2d");
      if (!context) return;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      contextRef.current = context;

      // Draw initial white background
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen, isMinimized]);

  // Handle stroke configuration updates
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = tool === "eraser" ? "#ffffff" : color;
      contextRef.current.lineWidth = tool === "eraser" ? lineWidth * 4 : lineWidth;
    }
  }, [color, lineWidth, tool]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!contextRef.current) return;
    
    // Support mobile touch events
    let clientX = 0;
    let clientY = 0;
    
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvasRef.current!.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return;

    let clientX = 0;
    let clientY = 0;
    
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvasRef.current!.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    e.preventDefault();
  };

  const stopDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (canvasRef.current && contextRef.current) {
      const canvas = canvasRef.current;
      contextRef.current.fillStyle = "#ffffff";
      contextRef.current.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="scratchpad-outer-wrapper"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
          width: isMinimized ? "260px" : "480px",
          height: isMinimized ? "50px" : "450px"
        }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`fixed bottom-4 right-4 bg-white rounded-2xl shadow-2xl border-4 border-stone-200 overflow-hidden z-40 flex flex-col`}
      >
        {/* Header bar */}
        <div 
          id="scratchpad-header-bar"
          className="bg-stone-100 px-4 py-2.5 flex items-center justify-between border-b border-stone-200 cursor-pointer select-none"
          onClick={() => isMinimized && setIsMinimized(false)}
        >
          <div className="flex items-center gap-2">
            <Edit2 size={16} className="text-stone-700" />
            <span className="font-sans font-bold text-sm text-stone-700">Rough Scratchpad</span>
          </div>
          
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {isMinimized ? (
              <button 
                id="btn-maximize-scratchpad"
                onClick={() => setIsMinimized(false)} 
                className="p-1 hover:bg-stone-200 rounded-lg text-stone-600 transition"
                title="Expand Scratchpad"
              >
                <Maximize2 size={14} />
              </button>
            ) : (
              <button 
                id="btn-minimize-scratchpad"
                onClick={() => setIsMinimized(true)} 
                className="p-1 hover:bg-stone-200 rounded-lg text-stone-600 transition"
                title="Minimize Scratchpad"
              >
                <Minimize2 size={14} />
              </button>
            )}

            {onClose && (
              <button 
                id="btn-close-scratchpad"
                onClick={onClose} 
                className="p-1 hover:bg-red-100 hover:text-red-500 rounded-lg text-stone-600 transition"
                title="Close"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Content area: only show if not minimized */}
        {!isMinimized && (
          <div id="scratchpad-content-area" className="flex-1 flex flex-col min-h-0 bg-white">
            {/* Toolbar */}
            <div className="p-2 border-b border-stone-100 flex items-center justify-between flex-wrap gap-2 bg-stone-50">
              {/* Tool selector */}
              <div className="flex items-center bg-white rounded-lg p-0.5 border border-stone-200 shadow-sm">
                <button
                  id="tool-pen"
                  onClick={() => setTool("pen")}
                  className={`px-2.5 py-1.5 rounded-md flex items-center gap-1.5 text-xs font-bold transition ${
                    tool === "pen" 
                      ? "bg-blue-600 text-white shadow-sm" 
                      : "text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  <Pencil size={12} />
                  Pen
                </button>
                <button
                  id="tool-eraser"
                  onClick={() => setTool("eraser")}
                  className={`px-2.5 py-1.5 rounded-md flex items-center gap-1.5 text-xs font-bold transition ${
                    tool === "eraser" 
                      ? "bg-stone-600 text-white shadow-sm" 
                      : "text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  <Eraser size={12} />
                  Eraser
                </button>
              </div>

              {/* Color selections (Pen only) */}
              {tool === "pen" && (
                <div className="flex items-center gap-1">
                  {["#2563eb", "#dc2626", "#16a34a", "#121212"].map((c) => (
                    <button
                      key={c}
                      id={`color-${c}`}
                      onClick={() => setColor(c)}
                      style={{ backgroundColor: c }}
                      className={`w-6 h-6 rounded-full cursor-pointer transition transform duration-150 ${
                        color === c ? "scale-125 ring-2 ring-stone-400 ring-offset-1 shadow-md" : "hover:scale-110"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center gap-1">
                <button
                  id="btn-clear-canvas"
                  onClick={clearCanvas}
                  className="px-2.5 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-md border border-red-200 flex items-center gap-1 text-xs font-bold transition"
                  title="Clear drawing"
                >
                  <Trash2 size={12} />
                  Clear
                </button>
              </div>
            </div>

            {/* Thickness and tool guide */}
            <div className="px-3 py-1.5 bg-stone-50 border-b border-stone-100 flex items-center gap-3">
              <span className="text-[11px] font-bold text-stone-500 font-sans">Brush Size:</span>
              <input
                id="brush-size-slider"
                type="range"
                min="1"
                max="15"
                value={lineWidth}
                onChange={(e) => setLineWidth(parseInt(e.target.value))}
                className="w-24 accent-blue-600"
              />
              <span className="text-[11px] font-mono font-medium text-stone-400">{lineWidth}px</span>
              
              <div className="ml-auto text-[10px] text-stone-400 font-sans">
                {tool === "pen" ? "Write calculations here!" : "Rub out mistakes"}
              </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 relative bg-white border-b border-stone-200 min-h-[220px]">
              <canvas
                id="scratchpad-canvas"
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
              />
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
