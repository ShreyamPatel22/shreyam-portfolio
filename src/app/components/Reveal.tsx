"use client";

import { motion } from "framer-motion";

export function Reveal ({ children, delay = 0}: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y:14 }}
            whileInView={{ opacity: 1, y: 0}}
            viewport={{ once: true, margin: "-80px"}}
            transition={{ duration: 0.45, delay }}
        > 
        {children}
        </motion.div>
    );
}