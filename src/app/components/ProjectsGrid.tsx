"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "./ProjectCard";

const container = {
    show: {transition: { staggerChildren: 0.06, delayChildren: 0.05} },
};

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y:0, transition: { duration: 0.35 } },
};

export function ProjectsGrid({ projects }: { projects: Project[] }) {
    return (
        <motion.div
            className="mt-6 grid gap-6 sm:grid-cols-2"
            variants={container}
            initial= "hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px"}}
        >
            {projects.map((p) => (
                <motion.div key = {p.title} variants={item}>
                    <ProjectCard {...p} />
                </motion.div>
            ))}
        </motion.div>
    );
}
