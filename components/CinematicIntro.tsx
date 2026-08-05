'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, SkipForward, Flame, Zap, Shield, ChevronRight, Activity } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [step, setStep] = useState<number>(0); 
  // 0: Macro Raw Metal Surface
  // 1: Precision Machining & Sparks
  // 2: Robotic Laser Transformation
  // 3: Dark Studio Showcase ("NEXA - ENGINEERED TO MOVE INDUSTRIES")

  const [sparkCount, setSparkCount] = useState<number>(0);

  // Spark Physics Simulation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particles array for spark explosion
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: string;
    }[] = [];

    const sparkColors = ['#E11D48', '#FF7800', '#FFC700', '#FFFFFF', '#FF3B5C'];

    const createSparks = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 3,
          life: 0,
          maxLife: Math.random() * 40 + 20,
          size: Math.random() * 2.5 + 1,
          color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
        });
      }
    };

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.02;
      ctx.fillStyle = 'rgba(11, 12, 14, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Raw Metal Texture Pass
      if (step === 0) {
        // Draw macro surface imperfections
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 30; i++) {
          const y = (i * 35 + t * 10) % height;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y + Math.sin(t + i) * 15);
          ctx.stroke();
        }
      }

      // Machining & Spark Pass
      if (step === 1 || step === 2) {
        const cutterX = width * 0.35 + Math.sin(t * 2) * (width * 0.2);
        const cutterY = height * 0.5 + Math.cos(t * 1.5) * 40;

        // Laser / Cutter Arc
        ctx.beginPath();
        ctx.arc(cutterX, cutterY, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#E11D48';
        ctx.shadowColor = '#E11D48';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (Math.random() > 0.3) {
          createSparks(cutterX, cutterY, 12);
        }
      }

      // Update and Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // Gravity
        p.life++;

        const alpha = 1 - p.life / p.maxLife;
        if (alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      setSparkCount(particles.length);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [step]);

  // Automatic step timer for cinematic flow
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 3200);
    const timer2 = setTimeout(() => setStep(2), 6500);
    const timer3 = setTimeout(() => setStep(3), 9800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="relative w-full h-[620px] md:h-[700px] bg-[#0B0C0E] overflow-hidden rounded-2xl border border-white/10 shadow-2xl flex flex-col justify-between">
      {/* Background Spark Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none z-0" />

      {/* Top HUD Line */}
      <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[#E11D48] rounded-sm animate-ping" />
          <span className="font-tech text-sm tracking-widest text-white uppercase font-bold">
            NEXA CINEMATIC CAPABILITY ENGINE // STAGE {step + 1} OF 4
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-gray-400 hidden sm:inline">
            CUTTER TEMP: <span className="text-[#E11D48]">1,480°C</span> | SPARKS: {sparkCount}
          </span>
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded border border-white/20 transition-all"
          >
            <span>SKIP INTRO</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Central Sequence Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 text-center">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-xs text-gray-300">
                <Activity className="w-3.5 h-3.5 text-[#E11D48]" />
                <span>PHASE 1: MACRO SUPERALLOY SURFACE SCAN</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-tech">
                METALLURGICAL PERFECTION AT MICRO-SCALE
              </h2>
              <p className="text-sm md:text-base text-gray-400 font-sans leading-relaxed">
                Scanning raw vacuum-melted Inconel 718 ingot surface imperfections before 5-axis high-speed CNC milling.
              </p>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E11D48]/10 border border-[#E11D48]/40 rounded-full font-mono text-xs text-[#E11D48]">
                <Flame className="w-3.5 h-3.5" />
                <span>PHASE 2: HIGH-SPEED 5-AXIS CNC MACHINING</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-tech">
                TOLERANCE TO ±0.002 MILLIMETERS
              </h2>
              <p className="text-sm md:text-base text-gray-400 font-sans leading-relaxed">
                Diamond PCD cutting tool removes excess mass at 24,000 RPM while cryogenic liquid CO2 cooling protects alloy grain structure.
              </p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full font-mono text-xs text-gray-200">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                <span>PHASE 3: ROBOTIC LASER DEPOSITION &amp; HEAT TREATMENT</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-tech">
                TRANSFORMING RAW MASS INTO PRECISION ASSET
              </h2>
              <p className="text-sm md:text-base text-gray-400 font-sans leading-relaxed">
                Multi-axis robotic arm applies thermal barrier ceramic cladding and automated CMM optical quality verification.
              </p>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="max-w-3xl space-y-6"
            >
              <div className="font-tech text-6xl md:text-8xl font-black text-white tracking-widest text-glow-crimson uppercase">
                NEXA
              </div>
              <div className="text-xl md:text-3xl font-extrabold text-gray-200 tracking-tight font-tech uppercase">
                ENGINEERED TO MOVE INDUSTRIES.
              </div>
              <p className="text-sm text-gray-400 max-w-xl mx-auto font-sans leading-relaxed">
                Digital infrastructure for global OEMs, aerospace contractors, energy operators, and heavy equipment manufacturers.
              </p>

              <div className="pt-4">
                <button
                  onClick={onComplete}
                  className="group relative px-8 py-4 bg-[#E11D48] hover:bg-[#F43F5E] text-white font-tech text-base font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_0_35px_rgba(225,29,72,0.6)] flex items-center justify-center gap-3 mx-auto"
                >
                  <span>EXPLORE CAPABILITY</span>
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Timeline Indicator */}
      <div className="relative z-10 p-6 border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="grid grid-cols-4 gap-2">
          {['RAW METAL', 'MACHINING', 'ROBOTIC CLADDING', 'STUDIO FINISH'].map((label, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className="group text-left"
            >
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full bg-[#E11D48] transition-all duration-500 ${
                    i <= step ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
              <div className="text-[10px] font-mono font-semibold text-gray-400 group-hover:text-white uppercase truncate">
                0{i + 1}. {label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
