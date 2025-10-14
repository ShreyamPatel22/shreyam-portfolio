"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function SignatureUnderline() {
    const ref = useRef(null);
    const inView = useInView(ref, {once: true, margin: "-20% 0px -20% 0px"});
    const r = useReducedMotion();

    return (
        <svg ref={ref} width="220" height="16" viewBox="0 0 220 16" className="mt-2">
            <motion.path
                d="M2 10 C65 2, 135 18, 218 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.7 }}
                animate={inView ? { pathLength: 1, opacity: 1} : {}}
                transition={r ? {duration: 0 } : {duration: 0.9, ease: "easeOut"}}
            />
        </svg>
    );
}