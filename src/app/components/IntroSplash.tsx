"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, MotionValue, number, useAnimationControls, useMotionValue, useReducedMotion } from "framer-motion";

const INTRO_KEY = "seenIntro";
const AUTO_EXIT_MS = 8000; 
const BASE_SPEED = 18;                                               
const BOOST_SPEED = 180;                                            
const BOOST_DECAY_MS = 800; 

const RESUME_URL = "/Shreyam_Patel_Resume.pdf";
const GITHUB_URL = "https://github.com/ShreyamPatel22";


export function IntroSplash() {
    const [show, setShow] = useState(false);
    const controls = useAnimationControls();
    const r = useReducedMotion();

    // rotation motion values – one per eye (can be different later if you want)
    const leftRot = useMotionValue(0);
    const rightRot = useMotionValue(0);


    // Current speed
    const leftSpeed = useRef(BASE_SPEED);
    const rightSpeed = useRef(BASE_SPEED);
    const decayTimer = useRef<number | null>(null);


    useEffect(() => {
        // Show once per session, allow skip
        if (typeof window === "undefined") return;
        if (sessionStorage.getItem(INTRO_KEY) === "1" || r) return;
        setShow(true);

        let raf = 0;
        let last = performance.now();
        const tick = (t: number) => {
            const dt = (t - last) / 1000;
            last = t;
            leftRot.set(leftRot.get() + leftSpeed.current * dt);
            rightRot.set(rightRot.get() + rightSpeed.current * dt);
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        (async () => {
            // Sequence: appear -> eyes in -> blink -> zoom -> fade out
            await controls.start("enter");
            await controls.start("blink");

            // wait on screen; user can still click eyes to act
            await new Promise((res) => setTimeout(res, AUTO_EXIT_MS));
            await controls.start("zoom");
            await new Promise((res) => setTimeout(res, 250));
            sessionStorage.setItem(INTRO_KEY, "1");
            setShow(false);
            
            // autoExitTimer.current = window.setTimeout(async () => {
            //     await controls.start("zoom");
            //     await new Promise((res) => setTimeout(res, 250));
            //     sessionStorage.setItem(INTRO_KEY, "1");
            //     setShow(false);
            // }, AUTO_EXIT_MS);
        })();
        
        return () => {
            cancelAnimationFrame(raf);
            if (decayTimer.current) clearTimeout(decayTimer.current);
            //if (autoExitTimer.current) window.clearTimeout(autoExitTimer.current);
        };

    }, [controls, r, leftRot, rightRot]);

    if (!show) return null;
    
    const handleMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
        leftSpeed.current = BOOST_SPEED;
        rightSpeed.current = BOOST_SPEED;
        if (decayTimer.current) clearTimeout(decayTimer.current);
        decayTimer.current = window.setTimeout(() => {
        // ease back down over BOOST_DECAY_MS
        const start = performance.now();
        const s0L = leftSpeed.current;
        const s0R = rightSpeed.current;
        const step = (t: number) => {
            const k = Math.min(1, (t - start) / BOOST_DECAY_MS);
            const value = s0L + (BASE_SPEED - s0L) * k;
            leftSpeed.current = value;
            rightSpeed.current = s0R + (BASE_SPEED - s0R) * k;
            if (k < 1) requestAnimationFrame(step);
        };
        // if (autoExitTimer.current) {
        //     window.clearTimeout(autoExitTimer.current);
        //     autoExitTimer.current = null;
        // }
        // setPointer({ x: e.clientX, y: e.clientY });
        requestAnimationFrame(step);
        }, 120);
    };


    // const finishAndGo = (href: string, newTab = false) => {
    //     sessionStorage.setItem(INTRO_KEY, "1");
    //     if (newTab) {
    //         window.open(href, "_blank", "noopener,noreferrer");
    //     } else {
    //         window.location.href = href;
    //     }
    // };

    const finishAndGo = (href: string, newTab = false) => {
        sessionStorage.setItem(INTRO_KEY, "1");
        newTab ? window.open(href, "_blank", "noopener,noreferrer") : (window.location.href = href);
      };


    // sizes / positions
    const eyeBase = {
        background: "radial-gradient(closest-side, rgba(255,255,255,1) 0%, rgba(255,255,255,.92) 60%, rgba(255,255,255,0) 100%)",
    };

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-black text-white overflow-hidden"
            onMouseMove={handleMove}
            initial= {{ opacity: 1}}
            animate= {controls}
            variants={{
                enter: { opacity: 1, transition: { duration: 0.1 } },
                blink: {},
                zoom: { opacity: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
            aria-label="Intro animation"
            role="dialog"
            aria-modal="true"
        >
             {/* Skip */}
            <button
                onClick={() => { sessionStorage.setItem(INTRO_KEY, "1"); 
                setShow(false); 
            }}
                className="absolute right-4 top-4 z-[10000] rounded-full border border-white/30 px-3 py-1 text-xs text-white/80 hover:text-white hover:border-white/60"
            >
                    Skip
            </button>

             {/* Replay */}
             <button
                onClick={() => { sessionStorage.removeItem(INTRO_KEY); 
                location.reload(); 
            }}
                className="absolute left-4 top-4 text-xs opacity-60 hover:opacity-100 underline"
                >
                Replay intro
            </button>

                {/* Eyes container */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center gap-24 sm:gap-40"
                    initial="initial"
                    animate={controls}
                    variants={{
                        initial: { opacity: 1, scale: 1},
                        enter: { scale: 1, opacity: 1, transition: { duration: 0.4} },
                        blink:{scaleY: [1, 0.1, 1], transition: { duration: 0.35, times: [0, 0.5, 1], ease: "easeInOut" },},
                        zoom: { scale: 3.6, opacity: 0.95, transition: { duration: 0.8, ease: "easeInOut"} },
                    }}
                >

                <AlmondEye
                    className="h-44 w-[300px] sm:h-56 sm:w-[380px]"
                    rotation={leftRot}                                         // ✅ use rotation MV
                    title="Open Resume"
                    onClick={() => finishAndGo(RESUME_URL)}
                    >
                    <SharinganIris rotation={leftRot} />                       {/* ✅ pass rotation down */}
                </AlmondEye>
                {/* Left Eye */}
                {/* <motion.div
                    className="svg-ctr"
                    style={eyeBase}
                    animate={{ rotate: 360}}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    variants={{
                        initial: { y: 30, opacity: 0 },
                        enter: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
                        blink: { scaleY: [1, 0.1, 1], transition: { duration: 0.35, times: [0, 0.5, 1], ease: "easeInOut" } },
                    }}

                >
                    <EyeSharingan /> */}

                    {/* Ring
                    <motion.div
                        className="absolute inset-0 rounded-full border border-red-400/70"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Tomoe-like marks */}
                    {/* <Tomoe className="absolute left-1/2 top-2 -translate-x-1/2 text-red-400/90" />
                    <Tomoe className="absolute right-2 top-1/2 -translate-y-1/2 text-red-400/90" />
                    <Tomoe className="absolute left-2 bottom-1/2 translate-y-1/2 text-red-400/90" /> */}

                     {/* Add pupil for symmetry */}
                    {/* <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" /> */}
                    {/* </motion.div> */}
                    

                    {/* RIGHT EYE zoom in this one */}
                    {/* <motion.div
                        className="relative h-40 w-40 sm:h-56 sm:w-56"
                        style={eyeBase}
                        animate={controls}
                        variants={{
                            initial: { y: -30, opacity: 0},
                            enter: {
                                y: 0, 
                                opacity:1, 
                                transition: {duration:0.6, ease: "easeOut", delay: 0.5 },
                            },
                            
                            blink: { 
                                scaleY: [1, 0.1, 1], 
                                transition: {duration: 0.35, 
                                times: [0,0.5,1], 
                                ease: "easeInOut", 
                                delay: 0.05 
                            }, 
                        },
                        zoom: {},
                    }}
                > */}
                        {/* <motion.div
                            className="absolute inset-0 rounded-full border border-red-400/70"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        /> */}

                        {/* <Tomoe className="absolute left-1/2 top-2 -translate-x-1/2 text-red-400/90" />
                        <Tomoe className="absolute right-2 top-1/2 -translate-y-1/2 text-red-400/90" />
                        <Tomoe className="absolute left-2 bottom-1/2 translate-y-1/2 text-red-400/90" />
                        <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" /> */}
                        {/* <EyeRinnegan /> */}
                        <AlmondEye
                            className="h-44 w-[300px] sm:h-56 sm:w-[380px]"
                            rotation={rightRot}
                            title="Open GitHub"
                            onClick={() => finishAndGo(GITHUB_URL, true)}
                            >
                            <RinneganIris rotation={rightRot} />
                        </AlmondEye>
                {/* </motion.div> */}
            </motion.div>
        </motion.div>
    );
}

// function Tomoe({ className = ""}: { className?: string }) {
//     return (
//         <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden="true">
//             <path
//                 fill="currentColor"
//                 d="M12 2a6 6 0 1 0 6 6c0-1.657-.672-3.157-1.757-4.243A5.985 5.985 0 0 0 12 2zm0 2c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2z"
//             />
//         </svg>
//     );
// }

// function EyeSharingan() {
//     return (
//         <svg viewBox=" 0 0 200 200" className="h-full w-full" aria-hidden="true">
//             <defs>
//                 <radialGradient id ="sg-iris" cx="50%" cy="50%" r="50%">
//                     <stop offset="0%" stopColor="#ff3b3b" />
//                     <stop offset="65%" stopColor="#c51010" />
//                     <stop offset="100%" stopColor="#7a0c0c" />
//                 </radialGradient>
//                 <filter id="sg-glow" x="-50%" y="-50%" width="200%" height="200%">
//                     <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#ff6666" floodOpacity="0.35" />
//                 </filter>
//             </defs>

//             <circle cx="100" cy="100" r="86" fill="url(#sg-iris)" stroke="#ff8a8a" strokeWidth="2" filter="url(#sg-glow)" />
//             <circle cx="100" cy="100" r="86" fill="none" stroke="black" strokeOpacity="0.55" strokeWidth="10" />

//             <motion.g
//                 className="svg-ctr"      
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 6, repeat: Infinity, ease: "linear"}}
//                 style={{ transformOrigin: "100px 100px" }}
//             >
//                 <TomoeSvg x={100} y={30} />
//                 <TomoeSvg x={160} y={100} />
//                 <TomoeSvg x={40} y={100} />
//             </motion.g>

//             <circle cx="100" cy="100" r="10" fill="#000" />
//         </svg>
//     );
// }

// function EyeRinnegan() {
//     const rings = Array.from({ length: 7 }, (_, i) => 25 + i * 8);

//     return (
//         <svg viewBox = "0 0 200 200" className="h-full w-full" aria-hidden="true">
//             <defs>
//                 <radialGradient id="rn-iris" cx="50%" cy="50%" r="50%">
//                 <stop offset="0%" stopColor="#c19cff" />
//                 <stop offset="65%" stopColor="#8b6fff" />
//                 <stop offset="100%" stopColor="#5e43c6" />
//                 </radialGradient>
//                 <filter id="rn-glow" x="-50%" y="-50%" width="200%" height="200%">
//                 <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#c19cff" floodOpacity="0.35" />
//                 </filter>
//             </defs>

//             <circle cx="100" cy="100" r="86" fill="url(#rn-iris)" stroke="#caaeff" strokeWidth="2" filter="url(#rn-glow)" />
//             <circle cx="100" cy="100" r="86" fill="none" stroke="black" strokeOpacity="0.55" strokeWidth="10" />

//             <motion.g
//                 className="svg-ctr" 
//                 animate={{ rotate: -360 }}    
//                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//                 style={{ transformOrigin: "100px 100px" }}
//                 stroke="#e3d9ff"
//                 strokeOpacity="0.8"
//                 fill="none"
//             >
//                 {rings.map((r) => (
//                     <circle key={r} cx="100" cy="100" r={r} strokeWidth={1.5} />
//                 ))}
//                 <path d="M100 20 L100 180" stroke="#e3d9ff" strokeOpacity="0.6" strokeWidth={1} />
//             </motion.g>
//             <circle cx="100" cy="100" r="8" fill="#000" />
//         </svg>
//     );
// }

// function TomoeSvg({ x, y }: { x: number; y: number }) {
//     return (
//         <g transform={`translate(${x}, ${y})`}>
//         <circle r="5" fill="#ff9b9b" />
//         <path
//             d="M 0 0 C 10 5, 18 18, 8 26 C 2 31, -8 30, -12 24 C -16 18, -8 10, 0 0 Z"
//             fill="#ff4a4a"
//         />
//     </g>
//     );
// }


// function AlmondEye({
//     children,
//     className = "",
//     pointer,
//     onClick,
//     title,
//   }: {
//     children: React.ReactNode;
//     className?: string;
//     pointer: { x: number; y: number };
//     onClick?: () => void;
//     title?: string;
//   }) {
//     const ref = React.useRef<SVGSVGElement | null>(null);
//     const [center, setCenter] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  
//     // Measure the eye’s center on mount + resize
//     React.useEffect(() => {
//       const measure = () => {
//         if (!ref.current) return;
//         const r = ref.current.getBoundingClientRect();
//         setCenter({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
//       };
//       measure();
//       window.addEventListener("resize", measure);
//       // some layout changes (font loading, etc.) can shift position; re-measure shortly after mount
//       const t = window.setTimeout(measure, 0);
//       return () => {
//         window.removeEventListener("resize", measure);
//         window.clearTimeout(t);
//       };
//     }, []);
  
//     // compute small offset toward pointer
//     const dx = pointer.x - center.x;
//     const dy = pointer.y - center.y;
//     const len = Math.hypot(dx, dy) || 1;
//     const ox = (dx / len) * MAX_IRIS_SHIFT;
//     const oy = (dy / len) * MAX_IRIS_SHIFT;
  
//     return (
//       <svg
//         ref={ref} // ✅
//         viewBox="0 0 260 120"
//         className={`cursor-pointer drop-shadow-[0_0_12px_rgba(255,255,255,0.05)] ${className}`}
//         onClick={onClick}
//         aria-label={title}
//         role="button"
//       >
//         <defs>
//           <clipPath id="eye-clip">
//             <path d="M10,60 C60,10 200,10 250,60 C200,110 60,110 10,60 Z" />
//           </clipPath>
//           <filter id="eye-glow" x="-50%" y="-50%" width="200%" height="200%">
//             <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
//             <feColorMatrix
//               in="blur"
//               type="matrix"
//               values="0 0 0 0 0.9  0 0 0 0 0.9  0 0 0 0 0.9  0 0 0 0.4 0"
//               result="glow"
//             />
//             <feMerge>
//               <feMergeNode in="glow" />
//               <feMergeNode in="SourceGraphic" />
//             </feMerge>
//           </filter>
//         </defs>
  
//         {/* sclera & lids */}
//         <path d="M10,60 C60,10 200,10 250,60 C200,110 60,110 10,60 Z" fill="#f6f6f6" filter="url(#eye-glow)" />
//         <path d="M10,60 C60,10 200,10 250,60" fill="none" stroke="#1b1b1b" strokeWidth="4" strokeOpacity="0.9" />
//         <path d="M10,60 C60,110 200,110 250,60" fill="none" stroke="#1b1b1b" strokeWidth="4" strokeOpacity="0.9" />
  
//         {/*  move the iris group a little toward the pointer */}
//         <g clipPath="url(#eye-clip)" transform={`translate(${ox}, ${oy})`}>{children}</g>
//       </svg>
//     );
//   }


//  AlmondEye.tsx (you can keep it in the same file if you prefer)

export function AlmondEye({
  children,
  className = "",
  rotation,                                              //  NEW: rotation MV
  onClick,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  rotation: MotionValue<number>;                         //  NEW
  onClick?: () => void;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 300 140"
      className={`drop-shadow-[0_0_18px_rgba(255,255,255,0.08)] ${className}`}
      aria-hidden="true"
      onClick={onClick}
    >
      <defs>
        {/* ✅ eyelid gradient + glow */}
        <radialGradient id="eyeGlow" cx="50%" cy="60%" r="70%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* ✅ clip the iris art to the almond shape */}
        <clipPath id="eyeClip">
          <path d="M12,70 C78,10 222,10 288,70 C222,130 78,130 12,70 Z" />
        </clipPath>
      </defs>

      {/* sclera */}
      <path d="M12,70 C78,10 222,10 288,70 C222,130 78,130 12,70 Z" fill="#f3f3f3" />
      {/* lids */}
      <path d="M12,70 C78,10 222,10 288,70" fill="none" stroke="#1a1a1a" strokeWidth="6" />
      <path d="M12,70 C78,130 222,130 288,70" fill="none" stroke="#1a1a1a" strokeWidth="6" />
      {/* soft glow */}
      <ellipse cx="150" cy="90" rx="140" ry="35" fill="url(#eyeGlow)" opacity="0.35" />

      {/* iris content (rotates inside via passed rotation MV) */}
      <g clipPath="url(#eyeClip)">{children}</g>

      {/* small highlight */}
      <ellipse cx="210" cy="60" rx="14" ry="8" fill="#fff" opacity="0.18" />
    </svg>
  );
}

//   function SharinganIris() {
//     return (
//       <svg viewBox="0 0 260 120" width="100%" height="100%">
//         <defs>
//           <radialGradient id="sg-iris" cx="50%" cy="50%" r="60%">
//             <stop offset="0%" stopColor="#ff3b3b" />
//             <stop offset="65%" stopColor="#c51010" />
//             <stop offset="100%" stopColor="#7a0c0c" />
//           </radialGradient>
//         </defs>
  
//         {/* iris circle centered in the eye */}
//         <circle cx="130" cy="60" r="50" fill="url(#sg-iris)" />
//         {/* dark ring */}
//         <circle cx="130" cy="60" r="55" fill="none" stroke="#111" strokeWidth="8" opacity={0.6} />
  
//         {/* Tomoe group – rotates smoothly */}
//         <motion.g
//           animate={{ rotate: 360 }}
//           transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
//           style={{ originX: 130, originY: 60 }} //  CHANGED: correct transform origin for SVG
//         >
//           <TomoeSvg cx={130} cy={22} />
//           <TomoeSvg cx={174} cy={60} />
//           <TomoeSvg cx={86} cy={60} />
//         </motion.g>
  
//         {/* pupil */}
//         <circle cx="130" cy="60" r="7" fill="#000" />
//       </svg>
//     );
//   }
  
//   function RinneganIris() {
//     const rings = Array.from({ length: 7 }, (_, i) => 18 + i * 6);
//     return (
//       <svg viewBox="0 0 260 120" width="100%" height="100%">
//         <defs>
//           <radialGradient id="rn-iris" cx="50%" cy="50%" r="60%">
//             <stop offset="0%" stopColor="#c19cff" />
//             <stop offset="65%" stopColor="#8b6fff" />
//             <stop offset="100%" stopColor="#5e43c6" />
//           </radialGradient>
//         </defs>
  
//         <circle cx="130" cy="60" r="50" fill="url(#rn-iris)" />
//         <circle cx="130" cy="60" r="55" fill="none" stroke="#111" strokeWidth="8" opacity={0.6} />
  
//         <motion.g
//           animate={{ rotate: -360 }}
//           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//           style={{ originX: 130, originY: 60 }} //  CHANGED: correct transform origin
//           stroke="#e3d9ff"
//           strokeOpacity="0.9"
//           fill="none"
//         >
//           {rings.map((r) => (
//             <circle key={r} cx="130" cy="60" r={r} strokeWidth={1.5} />
//           ))}
//           {/* subtle radial line */}
//           <path d="M130 8 L130 112" strokeWidth={1} strokeOpacity="0.7" />
//         </motion.g>
  
//         <circle cx="130" cy="60" r="6.5" fill="#000" />
//       </svg>
//     );
//   }

//   function TomoeSvg({ cx, cy }: { cx: number; cy: number }) {
//     return (
//       <g transform={`translate(${cx}, ${cy})`}>
//         <circle r="5.5" fill="#ff9b9b" />
//         <path
//           d="M 0 0 C 8 4, 14 14, 6 20 C 2 23, -6 22, -9 18 C -12 14, -6 8, 0 0 Z"
//           fill="#ff4a4a"
//         />
//       </g>
//     );
//   }


/* --------------------  Sharingan  -------------------- */
export function SharinganIris({ rotation }: { rotation: MotionValue<number> }) {
  // ✅ Let Framer feed rotation in degrees right into the group
  const rotateStr = useMotionTemplate`${rotation}`;

  return (
    <svg viewBox="0 0 300 140" width="100%" height="100%">
      <defs>
        <radialGradient id="sg-iris" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#ff3b3b" />
          <stop offset="55%" stopColor="#c31212" />
          <stop offset="100%" stopColor="#7a0c0c" />
        </radialGradient>
      </defs>

      {/* iris disk */}
      <circle cx="150" cy="70" r="52" fill="url(#sg-iris)" />
      {/* dark rim */}
      <circle cx="150" cy="70" r="58" fill="none" stroke="#0b0b0b" strokeWidth="10" opacity="0.65" />

      {/* tomoe ring – rotates clockwise via motion value */}
      <motion.g style={{ rotate: rotateStr, originX: 150, originY: 70 }}>
        <Tomoe cx={150} cy={24} />
        <Tomoe cx={198} cy={70} />
        <Tomoe cx={102} cy={70} />
      </motion.g>

      {/* thin inner ring + tiny ticks for detail */}
      <circle cx="150" cy="70" r="38" fill="none" stroke="#240606" strokeOpacity="0.55" strokeWidth="2" />
      <path d="M150 20 L150 40 M214 70 L234 70 M66 70 L46 70"
            stroke="#240606" strokeOpacity="0.35" strokeWidth="1" />

      {/* pupil */}
      <circle cx="150" cy="70" r="7.5" fill="#000" />
      {/* specular highlight */}
      <ellipse cx="172" cy="54" rx="12" ry="7" fill="#fff" opacity="0.18" />
    </svg>
  );
}

function Tomoe({ cx, cy }: { cx: number; cy: number }) {
  // A more “comma”-like tomoe
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <circle r="6" fill="#ff8a8a" />
      <path
        d="M 0 0
           C 10 4, 18 16, 8 24
           C 2 28, -8 26, -12 20
           C -14 14, -6 6, 0 0 Z"
        fill="#b31212"
      />
    </g>
  );
}

/* --------------------  Rinnegan  -------------------- */
export function RinneganIris({ rotation }: { rotation: MotionValue<number> }) {
  const rotateStr = useMotionTemplate`${rotation}`;

  const rings = Array.from({ length: 8 }, (_, i) => 16 + i * 6.2);

  return (
    <svg viewBox="0 0 300 140" width="100%" height="100%">
      <defs>
        <radialGradient id="rn-iris" cx="50%" cy="50%" r="62%">
          <stop offset="0%" stopColor="#c3a7ff" />
          <stop offset="55%" stopColor="#8f73ff" />
          <stop offset="100%" stopColor="#5e43c6" />
        </radialGradient>
      </defs>

      <circle cx="150" cy="70" r="52" fill="url(#rn-iris)" />
      <circle cx="150" cy="70" r="58" fill="none" stroke="#0b0b0b" strokeWidth="10" opacity="0.65" />

      {/* rings group – rotate slowly for a subtle hypnotic motion */}
      <motion.g
        style={{ rotate: rotateStr, originX: 150, originY: 70 }}
        stroke="#e9e2ff"
        strokeOpacity="0.9"
        fill="none"
      >
        {rings.map((r) => (
          <circle key={r} cx="150" cy="70" r={r} strokeWidth={1.4} />
        ))}
        {/* swirl / radial seam */}
        <path d="M150 16 L150 124" strokeWidth={1} strokeOpacity="0.7" />
      </motion.g>

      <circle cx="150" cy="70" r="6.5" fill="#000" />
      <ellipse cx="170" cy="58" rx="13" ry="8" fill="#fff" opacity="0.16" />
    </svg>
  );
}
