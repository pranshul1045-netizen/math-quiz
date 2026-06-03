/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Plus, Equal, ArrowRight } from "lucide-react";

interface VisualAidsProps {
  type?: "fraction_pizza" | "number_line" | "balance_scale" | "place_value" | "shape_geometry" | "ratio_grid" | "factor_tree";
  data: any;
}

export default function VisualAids({ type, data }: VisualAidsProps) {
  if (!type || !data) return null;

  switch (type) {
    case "fraction_pizza": {
      // 1. Single fraction pie OR two fraction sum pies
      const { numerator, denominator, numA, numB, scaleFactor, simplifiedNumerator, simplifiedDenominator } = data;

      if (numA !== undefined && numB !== undefined) {
        // Render Addition Sum Pizza Slices side-by-side
        const total = numA + numB;
        return (
          <div id="visual-fraction-sum" className="bg-white p-5 rounded-3xl border-3 border-indigo-950 flex flex-col items-center gap-3 shadow-[0_5px_0_0_#1e1b4b]">
            <span className="text-[11px] font-black text-indigo-950 uppercase tracking-widest font-sans">Blueberry Cake Summation</span>
            <div className="flex items-center gap-5 flex-wrap justify-center my-1.5">
              {/* Pizza A */}
              <div className="flex flex-col items-center">
                <PizzaCircle numerator={numA} denominator={denominator} color="#3b82f6" title={`Euler's cake: ${numA}/${denominator}`} />
              </div>
              <Plus size={18} className="text-indigo-950 font-black" strokeWidth={3} />
              {/* Pizza B */}
              <div className="flex flex-col items-center">
                <PizzaCircle numerator={numB} denominator={denominator} color="#ec4899" title={`Sophia's cake: ${numB}/${denominator}`} />
              </div>
              <Equal size={18} className="text-indigo-950 font-black" strokeWidth={3} />
              {/* Sum Pizza */}
              <div className="flex flex-col items-center">
                <PizzaCircle numerator={total} denominator={denominator} color="#10b981" title={`Total Eaten: ${total}/${denominator}`} />
              </div>
            </div>
            <p className="text-xs text-indigo-950/75 text-center font-bold font-sans">
              Each block represents $1/{denominator}$ of the cake.
            </p>
          </div>
        );
      }

      // Single Slice equivalence
      const numToUse = numerator || 0;
      const denToUse = denominator || 1;

      return (
        <div id="visual-fraction-pizza" className="bg-white p-5 rounded-3xl border-3 border-indigo-950 flex flex-col items-center gap-4 shadow-[0_5px_0_0_#1e1b4b]">
          <span className="text-[11px] font-black text-indigo-950 uppercase tracking-widest font-sans">Equivalent Fraction Visualization</span>
          <div className="flex items-center gap-8 flex-wrap justify-center my-1.5">
            <PizzaCircle numerator={numToUse} denominator={denToUse} color="#f97316" title={`Original: ${numToUse}/${denToUse}`} />
            
            {scaleFactor && (
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center text-amber-500 gap-1 font-black text-xs font-sans uppercase tracking-wider">
                  <span>Multiply &times; {scaleFactor}</span>
                  <ArrowRight size={14} strokeWidth={3} />
                </div>
                <PizzaCircle 
                  numerator={numToUse * scaleFactor} 
                  denominator={denToUse * scaleFactor} 
                  color="#e11d48" 
                  title={`Result: ${numToUse * scaleFactor}/${denToUse * scaleFactor}`} 
                />
              </div>
            )}

            {simplifiedNumerator && (
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center text-teal-600 gap-1 font-black text-xs font-sans uppercase tracking-wider">
                  <span>Simplest Form</span>
                  <ArrowRight size={14} strokeWidth={3} />
                </div>
                <PizzaCircle 
                  numerator={simplifiedNumerator} 
                  denominator={simplifiedDenominator} 
                  color="#0d9488" 
                  title={`Simplified: ${simplifiedNumerator}/${simplifiedDenominator}`} 
                />
              </div>
            )}
          </div>
        </div>
      );
    }

    case "number_line": {
      // Int comparisons, altitude above/below sea levels, plus subtraction hops
      const { activeValue, markerLabel, valA, valB, start, jump, result } = data;

      // Draw numberline spanning -8 to 8
      const range = [-8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8];
      const width = 420;
      const spacing = width / (range.length + 1);

      const getX = (val: number) => {
        const idx = range.indexOf(val);
        if (idx === -1) {
          if (val < -8) return spacing;
          return width - spacing;
        }
        return (idx + 1) * spacing;
      };

      return (
        <div id="visual-number-line" className="bg-white p-5 rounded-3xl border-3 border-indigo-950 flex flex-col items-center gap-3 shadow-[0_5px_0_0_#1e1b4b]">
          <span className="text-[11px] font-black text-indigo-950 uppercase tracking-widest font-sans">Number Line Sandbox</span>
          
          <div className="overflow-x-auto w-full flex justify-center py-2">
            <svg viewBox={`0 0 ${width} 120`} className="w-[420px] h-[120px] select-none">
              {/* Baseline Sea/Ground division */}
              <line x1="0" y1="60" x2={width} y2="60" stroke="#1e1b4b" strokeWidth="4" />
              
              {/* Ground vs Basement labels */}
              {activeValue !== undefined && (
                <>
                  <rect x="5" y="5" width="105" height="20" rx="6" fill="#3b82f6" fillOpacity="0.12" stroke="#3b82f6" strokeWidth="1" />
                  <text x="57" y="17" fill="#1d4ed8" fontSize="8" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">MOUNTAINS (+) </text>
                  <rect x="5" y="95" width="105" height="20" rx="6" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeWidth="1" />
                  <text x="57" y="107" fill="#b91c1c" fontSize="8" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">SUBMARINE (-) </text>
                </>
              )}

              {/* Increments ticks */}
              {range.map((num) => {
                const x = getX(num);
                const isZero = num === 0;
                return (
                  <g key={num}>
                    <line x1={x} y1="52" x2={x} y2="68" stroke={isZero ? "#1e1b4b" : "#4f46e5"} strokeWidth={isZero ? "4" : "2"} />
                    <text 
                      x={x} 
                      y="84" 
                      fill={isZero ? "#1e1b4b" : num < 0 ? "#ef4444" : "#4f46e5"} 
                      fontSize="10" 
                      fontWeight="black" 
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {num}
                    </text>
                  </g>
                );
              })}

              {/* 1. If absolute single marker mapping */}
              {activeValue !== undefined && (
                <g>
                  <circle cx={getX(activeValue)} cy="60" r="8" fill={activeValue < 0 ? "#ef4444" : "#2563eb"} className="animate-ping" style={{ animationDuration: '3s' }} />
                  <circle cx={getX(activeValue)} cy="60" r="7" fill={activeValue < 0 ? "#ef4444" : "#2563eb"} />
                  {/* Flag indicator pop */}
                  <path d={`M ${getX(activeValue)} 60 L ${getX(activeValue)} 24 L ${getX(activeValue) + 30} 14 L ${getX(activeValue)} 14`} fill={activeValue < 0 ? "#fee2e2" : "#dbeafe"} stroke={activeValue < 0 ? "#ef4444" : "#2563eb"} strokeWidth="2" />
                  <text x={getX(activeValue) + 15} y="21" fontSize="8" fontWeight="black" fill={activeValue < 0 ? "#b91c1c" : "#1e40af"} textAnchor="middle" fontFamily="sans-serif">
                    {activeValue}
                  </text>
                </g>
              )}

              {/* 2. If comparing A and B */}
              {valA !== undefined && valB !== undefined && (
                <g>
                  {/* Marker A */}
                  <circle cx={getX(valA)} cy="60" r="8" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1.5" />
                  <text x={getX(valA)} y="40" fill="#b91c1c" fontSize="9" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">A ({valA})</text>
                  {/* Marker B */}
                  <circle cx={getX(valB)} cy="60" r="8" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.5" />
                  <text x={getX(valB)} y="40" fill="#1d4ed8" fontSize="9" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">B ({valB})</text>
                </g>
              )}

              {/* 3. Frog Jump Equation line */}
              {start !== undefined && jump !== undefined && (
                <g>
                   {/* Draw arc jump */}
                  <path 
                    d={`M ${getX(start)} 60 Q ${(getX(start) + getX(result)) / 2} 15 ${getX(result)} 60`} 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="4" 
                    strokeDasharray="6,4"
                  />
                  
                  {/* Little jump indicator */}
                  <circle cx={getX(start)} cy="60" r="6" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                  <text x={getX(start)} y="46" fill="#78350f" fontSize="8" fontWeight="black" textAnchor="middle">Start</text>
                  
                  <circle cx={getX(result)} cy="60" r="7" fill="#10b981" stroke="#064e3b" strokeWidth="1.5" />
                  <text x={getX(result)} y="46" fill="#064e3b" fontSize="8" fontWeight="black" textAnchor="middle">Land {result}</text>

                  {/* Cute frog icon representation */}
                  <g transform={`translate(${(getX(start) + getX(result)) / 2 - 12}, 20)`}>
                    <rect x="0" y="0" width="24" height="14" rx="7" fill="#10b981" stroke="#064e3b" strokeWidth="1" />
                    <circle cx="6" cy="2" r="3.5" fill="#059669" />
                    <circle cx="18" cy="2" r="3.5" fill="#059669" />
                    <text x="12" y="10" fontSize="7" fill="#fff" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">🐸</text>
                  </g>
                  <text x={(getX(start) + getX(result)) / 2} y="15" fill="#047857" fontSize="9" fontWeight="black" textAnchor="middle" fontFamily="monospace">
                    {jump > 0 ? `+${jump}` : jump}
                  </text>
                </g>
              )}
            </svg>
          </div>
          <span className="text-[10px] text-indigo-950/75 font-sans font-bold text-center px-4 leading-normal">
            {jump ? `Jump ${Math.abs(jump)} steps ${jump > 0 ? "RIGHT (Positive)" : "LEFT (Negative)"} starting from ${start}.` : `The right side sits higher (is larger) on the number line.`}
          </span>
        </div>
      );
    }

    case "balance_scale": {
      // Equation balances! x + 3 = 7
      const { leftExpr, rightExpr, xValue } = data;

      return (
        <div id="visual-balance" className="bg-white p-5 rounded-3xl border-3 border-indigo-950 flex flex-col items-center gap-3 shadow-[0_5px_0_0_#1e1b4b]">
          <span className="text-[11px] font-black text-indigo-950 uppercase tracking-widest font-sans">Equation Seesaw Balance</span>
          
          <svg viewBox="0 0 400 160" className="w-[320px] h-[130px] select-none">
            {/* Base Pillar */}
            <path d="M 180 140 L 220 140 L 205 60 L 195 60 Z" fill="#4f46e5" stroke="#1e1b4b" strokeWidth="2" />
            <rect x="160" y="140" width="80" height="12" rx="6" fill="#1e1b4b" />

            {/* Scale Balance Beam Left / Right Hooks */}
            <line x1="80" y1="50" x2="320" y2="50" stroke="#4f46e5" strokeWidth="5" />
            <circle cx="200" cy="50" r="7" fill="#1e1b4b" />
            
            {/* Left Hanging Pan */}
            <line x1="80" y1="50" x2="50" y2="100" stroke="#1e1b4b" strokeWidth="2" />
            <line x1="80" y1="50" x2="110" y2="100" stroke="#1e1b4b" strokeWidth="2" />
            <ellipse cx="80" cy="100" rx="35" ry="6" fill="url(#metalic_gradient)" stroke="#1e1b4b" strokeWidth="2.5" />

            {/* Right Hanging Pan */}
            <line x1="320" y1="50" x2="290" y2="100" stroke="#1e1b4b" strokeWidth="2" />
            <line x1="320" y1="50" x2="350" y2="100" stroke="#1e1b4b" strokeWidth="2" />
            <ellipse cx="320" cy="100" rx="35" ry="6" fill="url(#metalic_gradient)" stroke="#1e1b4b" strokeWidth="2.5" />

            {/* Gradients */}
            <defs>
              <linearGradient id="metalic_gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>

            {/* Items Left Pan: Mystery Box (x) + small circle marbles */}
            {leftExpr && (
              <g transform="translate(80, 95)" textAnchor="middle">
                {leftExpr.includes("x") ? (
                  <>
                    {/* Mystery variables box */}
                    <rect x="-24" y="-20" width="22" height="16" rx="4" fill="#a78bfa" stroke="#4c1d95" strokeWidth="2" />
                    <text x="-13" y="-8" fill="#1e1b4b" fontSize="10" fontWeight="black" fontFamily="monospace">x</text>
                    
                    {/* Marble circles for + C */}
                    <circle cx="10" cy="-6" r="4.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                    <circle cx="18" cy="-14" r="4.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                    <circle cx="21" cy="-5" r="4.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                  </>
                ) : (
                  <text x="0" y="-12" fill="#4f46e5" fontSize="12" fontWeight="black" fontFamily="sans-serif">{leftExpr}</text>
                )}
              </g>
            )}

            {/* Items Right Pan */}
            {rightExpr && (
              <g transform="translate(320, 95)" textAnchor="middle">
                {!isNaN(parseInt(rightExpr)) ? (
                  <>
                    <circle cx="-15" cy="-8" r="4.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                    <circle cx="-5" cy="-14" r="4.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                    <circle cx="-7" cy="-5" r="4.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                    
                    <circle cx="5" cy="-6" r="4.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                    <circle cx="14" cy="-12" r="4.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                    <circle cx="17" cy="-5" r="4.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                    <text x="0" y="-22" fill="#78350f" fontSize="10" fontWeight="black" fontFamily="monospace">{rightExpr}</text>
                  </>
                ) : (
                  <text x="0" y="-12" fill="#4f46e5" fontSize="12" fontWeight="black" fontFamily="sans-serif">{rightExpr}</text>
                )}
              </g>
            )}
          </svg>
          
          <div className="text-center space-y-1">
            <span className="text-xs font-black text-indigo-950 font-sans uppercase tracking-wider block bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
              Balanced Equation State: {leftExpr} = {rightExpr}
            </span>
            {xValue && (
              <p className="text-[10px] text-indigo-950/70 font-sans font-bold leading-normal">
                Subtract equal fractions on both scales to reveal the value of **x = {xValue}**!
              </p>
            )}
          </div>
        </div>
      );
    }

    case "place_value": {
      // Tenths/hundredths decimal representations!
      const { valA, valB, number, highlightDigit } = data;

      if (valA !== undefined && valB !== undefined) {
        return (
          <div id="visual-decimal-comparison" className="bg-white p-5 rounded-3xl border-3 border-indigo-950 flex flex-col items-center gap-3 shadow-[0_5px_0_0_#1e1b4b]">
            <span className="text-[11px] font-black text-indigo-950 uppercase tracking-widest font-sans">Decimal Shading Map (Out of 1.0)</span>
            
            <div className="flex gap-8 flex-wrap justify-center items-center my-1">
              {/* Box A */}
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-xs font-black text-indigo-950 font-sans">{valA} shading</span>
                <DecimalGrid decimalValue={valA} fillColor="#2563eb" />
                <span className="text-[10px] text-indigo-950/70 font-mono font-bold">{(valA * 100).toFixed(0)}/100 blocks</span>
              </div>
              <div className="text-indigo-950 font-black text-xs uppercase tracking-widest bg-yellow-300 p-2 border-2 border-indigo-950 rounded-lg">VS</div>
              {/* Box B */}
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-xs font-black text-indigo-950 font-sans">{valB} shading</span>
                <DecimalGrid decimalValue={valB} fillColor="#ec4899" />
                <span className="text-[10px] text-indigo-950/70 font-mono font-bold">{(valB * 100).toFixed(0)}/100 blocks</span>
              </div>
            </div>
          </div>
        );
      }

      if (number !== undefined) {
        // Single digit place values map
        const pValues = String(number).split('.');
        const onesDigit = pValues[0];
        const tenthsDigit = pValues[1]?.[0] || "0";
        const hundredthsDigit = pValues[1]?.[1] || "0";
        const thousandthsDigit = pValues[1]?.[2] || "0";

        return (
          <div id="visual-place-chart" className="bg-white p-5 rounded-3xl border-3 border-indigo-950 flex flex-col items-center gap-3 shadow-[0_5px_0_0_#1e1b4b]">
            <span className="text-[11px] font-black text-indigo-950 uppercase tracking-widest font-sans">Place Value Column Chart</span>
            <div className="flex border-3 border-indigo-950 rounded-2xl overflow-hidden font-mono text-center shadow-sm">
              {/* Ones */}
              <div className={`p-3 w-16 ${highlightDigit === onesDigit ? 'bg-amber-100' : 'bg-white'}`}>
                <div className="text-[9px] text-indigo-950/60 font-black uppercase tracking-wider">Ones</div>
                <div className="text-lg font-black text-indigo-950 mt-1">{onesDigit}</div>
              </div>
              {/* Dot */}
              <div className="p-3 w-8 bg-indigo-50 border-x-3 border-indigo-950 flex items-end justify-center font-black text-xl select-none text-indigo-950">.</div>
              {/* Tenths */}
              <div className={`p-3 w-16 ${highlightDigit === tenthsDigit ? 'bg-amber-100 border-r-3 border-indigo-950' : 'bg-white border-r-3 border-indigo-950'}`}>
                <div className="text-[9px] text-indigo-950/60 font-black uppercase tracking-wider leading-none">Tenths</div>
                <div className="text-[8px] text-indigo-400 font-sans font-bold">(1/10)</div>
                <div className="text-lg font-black text-indigo-950 mt-1">{tenthsDigit}</div>
              </div>
              {/* Hundredths */}
              <div className={`p-3 w-20 ${highlightDigit === hundredthsDigit ? 'bg-amber-100' : 'bg-white'}`}>
                <div className="text-[9px] text-indigo-950/60 font-black uppercase tracking-wider leading-none">Hundredths</div>
                <div className="text-[8px] text-indigo-400 font-sans font-bold">(1/100)</div>
                <div className="text-lg font-black text-indigo-950 mt-1">{hundredthsDigit}</div>
              </div>
              {/* Thousandths */}
              {thousandthsDigit !== "0" && (
                <div className={`p-3 w-22 border-l-3 border-indigo-950 ${highlightDigit === thousandthsDigit ? 'bg-amber-100' : 'bg-white'}`}>
                  <div className="text-[9px] text-indigo-950/60 font-black uppercase tracking-wider leading-none">Thousandths</div>
                  <div className="text-[8px] text-indigo-400 font-sans font-bold">(1/1000)</div>
                  <div className="text-lg font-black text-indigo-950 mt-1">{thousandthsDigit}</div>
                </div>
              )}
            </div>
            <p className="text-[10px] text-indigo-950/75 text-center font-sans font-bold px-4">
              Highlighted cell is the target digit **{highlightDigit}** which lies in the **{highlightDigit === onesDigit ? 'Ones' : highlightDigit === tenthsDigit ? 'Tenths' : 'Hundredths'}** column!
            </p>
          </div>
        );
      }

      return null;
    }

    case "shape_geometry": {
      // Triangle, Area Rect, acute obtuse angles
      const { shape, angleA, angleB, angleC, length, width, label, angleDegree } = data;

      return (
        <div id="visual-shape-geometry" className="bg-white p-5 rounded-3xl border-3 border-indigo-950 flex flex-col items-center gap-3 shadow-[0_5px_0_0_#1e1b4b]">
          <span className="text-[11px] font-black text-indigo-950 uppercase tracking-widest font-sans">Geometry Vector Canvas</span>
          
          <div className="flex justify-center p-3 bg-indigo-50/40 rounded-2xl border-2 border-indigo-100">
            {shape === "triangle" && (
              <svg viewBox="0 0 160 120" className="w-[180px] h-[130px] select-none">
                {/* Scalene/Isosceles standard triangle layout */}
                <polygon points="80,15 15,100 145,100" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="4" strokeLinejoin="round" />
                
                {/* Labels */}
                <text x="80" y="32" fill="#1e3a8a" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">?</text>
                <text x="35" y="93" fill="#1e3a8a" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{angleA}°</text>
                <text x="125" y="93" fill="#1e3a8a" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{angleB}°</text>

                <text x="80" y="112" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  Interior sum = 180°
                </text>
              </svg>
            )}

            {shape === "rectangle" && (
              <svg viewBox="0 0 200 130" className="w-[200px] h-[130px] select-none">
                <rect x="35" y="25" width="130" height="75" fill="#f8fafc" stroke="#0e7490" strokeWidth="3.5" rx="6" />
                
                {/* Length labels top/bottom */}
                <text x="100" y="18" fill="#155e75" fontSize="11" fontWeight="black" textAnchor="middle" fontFamily="monospace">{length} cm</text>
                <text x="100" y="116" fill="#155e75" fontSize="11" fontWeight="black" textAnchor="middle" fontFamily="monospace">{length} cm</text>
                
                {/* Width labels sides */}
                <text x="18" y="67" fill="#155e75" fontSize="11" fontWeight="black" textAnchor="middle" fontFamily="monospace" transform="rotate(-90 18 67)">{width} cm</text>
                <text x="182" y="67" fill="#155e75" fontSize="11" fontWeight="black" textAnchor="middle" fontFamily="monospace" transform="rotate(90 182 67)">{width} cm</text>

                {/* Shading area indicator */}
                {label === "Area" ? (
                  <text x="100" y="68" fill="#0891b2" fontSize="9" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">Area Concept (LxW)</text>
                ) : (
                  <text x="100" y="68" fill="#0891b2" fontSize="9" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">Border Concept (Perimeter)</text>
                )}
              </svg>
            )}

            {shape === "angle" && (
              <svg viewBox="0 0 160 120" className="w-[180px] h-[130px] select-none">
                {(() => {
                  const rads = (angleDegree * Math.PI) / 180;
                  const endX = 40 + 75 * Math.cos(-rads);
                  const endY = 90 + 75 * Math.sin(-rads);
                  
                  const arcRadius = 25;
                  const startArcX = 40 + arcRadius;
                  const startArcY = 90;
                  const endArcX = 40 + arcRadius * Math.cos(-rads);
                  const endArcY = 90 + arcRadius * Math.sin(-rads);
                  
                  const largeArcFlag = angleDegree > 180 ? 1 : 0;
                  const sweepFlag = 0;

                  return (
                    <g>
                      {/* Rays */}
                      <line x1="40" y1="90" x2="140" y2="90" stroke="#0284c7" strokeWidth="4.5" strokeLinecap="round" />
                      <line x1="40" y1="90" x2={endX} y2={endY} stroke="#0284c7" strokeWidth="4.5" strokeLinecap="round" />
                      <circle cx="40" cy="90" r="5" fill="#f59e0b" stroke="#1e1b4b" strokeWidth="1" />

                      {/* Arc representation of angle */}
                      <path 
                        d={`M ${startArcX} ${startArcY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} ${sweepFlag} ${endArcX} ${endArcY}`} 
                        fill="none" 
                        stroke="#f59e0b" 
                        strokeWidth="4.5" 
                      />

                      {/* Label */}
                      <text x={40 + 40 * Math.cos(-rads / 2)} y={90 + 40 * Math.sin(-rads / 2) - 5} fill="#78350f" fontSize="10" fontWeight="black" textAnchor="middle" fontFamily="monospace">
                        {angleDegree}°
                      </text>
                    </g>
                  );
                })()}
              </svg>
            )}
          </div>
          <span className="text-[10px] text-indigo-950/75 font-sans font-bold text-center leading-normal">
            {shape === "triangle" ? "The three interior angles of a triangle always sum up to exactly 180°!" : shape === "rectangle" ? `Calculating ${label}: length is ${length} cm, width is ${width} cm.` : `This angle measures ${angleDegree} degrees.`}
          </span>
        </div>
      );
    }

    case "ratio_grid": {
      // Grouping 10:15 or unitary calculations
      const { leftCount, rightCount, leftSimp, rightSimp, isProportion, label, unitValue, originalCount, targetCount } = data;

      if (leftCount !== undefined && rightCount !== undefined) {
        return (
          <div id="visual-ratio-grid" className="bg-white p-5 rounded-3xl border-3 border-indigo-950 flex flex-col items-center gap-3 shadow-[0_5px_0_0_#1e1b4b]">
            <span className="text-[11px] font-black text-indigo-950 uppercase tracking-widest font-sans">Ratio Grouping Grid</span>
            <div className="flex gap-10 items-center flex-wrap justify-center bg-indigo-550/5 p-4 rounded-2xl border-2 border-indigo-100">
              {/* Group A */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-black text-indigo-950 font-sans">Group A ({leftCount} Red)</span>
                <div className="grid grid-cols-4 gap-1.5 p-1.5 bg-rose-50 rounded-xl border border-rose-100">
                  {Array.from({ length: leftCount }).map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-rose-500 rounded-full border border-rose-700 flex items-center justify-center text-[8px] font-bold text-white shadow-sm">🔴</div>
                  ))}
                </div>
              </div>
              <div className="text-2xl font-black text-indigo-950">:</div>
              {/* Group B */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-black text-indigo-950 font-sans">Group B ({rightCount} Green)</span>
                <div className="grid grid-cols-5 gap-1.5 p-1.5 bg-emerald-50 rounded-xl border border-emerald-100">
                  {Array.from({ length: rightCount }).map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-emerald-500 rounded-full border border-emerald-700 flex items-center justify-center text-[8px] font-bold text-white shadow-sm">🟢</div>
                  ))}
                </div>
              </div>
            </div>
            
            <p className="text-[10px] text-indigo-950/75 text-center font-sans font-bold leading-normal">
              Dividing both sides by HCF gives the simplified ratio {leftSimp} : {rightSimp}.
            </p>
          </div>
        );
      }

      if (unitValue !== undefined) {
        return (
          <div id="visual-unitary" className="bg-white p-5 rounded-3xl border-3 border-indigo-950 flex flex-col items-center gap-3 shadow-[0_5px_0_0_#1e1b4b]">
            <span className="text-[11px] font-black text-indigo-950 uppercase tracking-widest font-sans">Unitary Method Core Steps</span>
            
            <div className="flex items-center gap-3 bg-indigo-50/50 p-4 rounded-2xl border-2 border-indigo-100 flex-wrap justify-center">
              {/* Original Pack */}
              <div className="bg-amber-100 p-2.5 rounded-xl text-amber-800 text-center flex flex-col justify-center min-w-[80px] border-2 border-amber-300">
                <span className="text-[8px] font-black uppercase tracking-wider leading-none">Starting pack</span>
                <span className="text-xs font-black mt-1 font-mono">{originalCount} items</span>
              </div>
              <ArrowRight size={16} className="text-indigo-950 font-black" strokeWidth={3} />
              {/* Find for 1 item */}
              <div className="bg-blue-100 p-2.5 rounded-xl text-blue-850 text-center flex flex-col justify-center min-w-[80px] border-2 border-blue-300">
                <span className="text-[8px] font-black uppercase tracking-wider leading-none">Cost for 1 Unit</span>
                <span className="text-xs font-black mt-1 font-mono">${unitValue} each</span>
              </div>
              <ArrowRight size={16} className="text-indigo-950 font-black" strokeWidth={3} />
              {/* Target count cost */}
              <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-850 text-center flex flex-col justify-center min-w-[80px] border-2 border-emerald-300">
                <span className="text-[8px] font-black uppercase tracking-wider leading-none">Target quantity</span>
                <span className="text-xs font-black mt-1 font-mono">{targetCount} items</span>
              </div>
            </div>

            <p className="text-[10px] text-indigo-950/75 font-sans font-bold text-center leading-normal">
              1. Divide the total to find price for 1 item: **${unitValue}**.<br />
              2. Multiply that price by target weight/quantity **{targetCount}** items!
            </p>
          </div>
        );
      }

      return null;
    }

    default:
      return null;
  }
}

// Reusable Fraction Pizza SVG Visualizer
function PizzaCircle({ numerator, denominator, color, title }: { numerator: number; denominator: number; color: string; title: string }) {
  const radius = 30;
  const cx = 35;
  const cy = 35;
  const slices = Array.from({ length: denominator });

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="70" height="70" viewBox="0 0 70 70" className="select-none overflow-visible">
        {/* Draw background circle */}
        <circle cx={cx} cy={cy} r={radius} fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="2.5" />
        
        {/* Draw shaded slice wedges */}
        {denominator > 1 ? (
          slices.map((_, index) => {
            const startAngle = (index * 360) / denominator - 90;
            const endAngle = ((index + 1) * 360) / denominator - 90;
            const isShaded = index < numerator;

            // Wedge polar calculations
            const x1 = cx + radius * Math.cos((startAngle * Math.PI) / 180);
            const y1 = cy + radius * Math.sin((startAngle * Math.PI) / 180);
            const x2 = cx + radius * Math.cos((endAngle * Math.PI) / 180);
            const y2 = cy + radius * Math.sin((endAngle * Math.PI) / 180);

            // Path for circular sector wedge
            const d = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;

            return (
              <path
                key={index}
                d={d}
                fill={isShaded ? color : "transparent"}
                fillOpacity="0.8"
                stroke="#a8a29e"
                strokeWidth="1"
              />
            );
          })
        ) : (
          <circle cx={cx} cy={cy} r={radius} fill={numerator >= 1 ? color : "transparent"} fillOpacity="0.8" />
        )}

        {/* Small center pin center circle */}
        <circle cx={cx} cy={cy} r="3" fill="#78716c" />
      </svg>
      <span className="text-[10px] font-sans font-bold text-stone-600 mt-1">{title}</span>
    </div>
  );
}

// Reusable Decimal Grid Shading Visualizer
function DecimalGrid({ decimalValue, fillColor }: { decimalValue: number; fillColor: string }) {
  const blocks = Array.from({ length: 100 });
  const cutOff = Math.round(decimalValue * 100);

  return (
    <div className="grid grid-cols-10 gap-0.5 p-1 bg-stone-100 border border-stone-200 rounded shadow-inner">
      {blocks.map((_, index) => {
        const isFilled = index < cutOff;
        return (
          <div
            key={index}
            style={{ backgroundColor: isFilled ? fillColor : "#ffffff" }}
            className="w-3.5 h-3.5 border border-stone-200/50 rounded-sm transition duration-300"
          />
        );
      })}
    </div>
  );
}
