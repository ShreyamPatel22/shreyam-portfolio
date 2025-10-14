"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {stiffness: 120, damping: 30, mass: 0.2, restDelta: 0.001});
    return (
        <motion.div
        style={{scaleX }}
        className="fixed left-0 right-0 top-0 z-50 h-0.5 origin-left bg-black/80"
        />
    );
}