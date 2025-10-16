"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SignatureUnderline } from "./SignatureUnderline";

export function HeroTitle({ name }: { name: string }) {
    const r = useReducedMotion();

    return (
        <div className="relative inline-block">
            <motion.svg
                viewBox = "0 0 100 100"
                className="pointer-events-none absolute -left-10 -top-8 h-24 w-24 text-red-600/25 dark:text-red-400/25"
                initial={false}
                animate={r ? {} : { rotate: 360 }}
                transition={r ? {} : { duration: 12, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
            >
                <circle cx="50" cy="50" r = "40" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="50" cy="12" r="3" fill="currentColor" />
                <circle cx="12" cy="50" r="3" fill="currentColor" />
                <circle cx="88" cy="50" r="3" fill="currentColor" />
            </motion.svg>
            <h1 className="relative z-10 mt-1 text-4xl font-bold sm:text-5xl text-gray-900 dark:text-gray-100">
                {name}
            </h1>
            <SignatureUnderline />
        </div>
    );
}