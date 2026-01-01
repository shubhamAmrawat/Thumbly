import { LinkedinIcon } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="mt-20 py-6 px-6 md:px-16 lg:px-24 xl:px-32 border-t border-slate-800/50">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                    {/* Left: Logo + Brand Name */}
                    <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition group">
                            <img className="size-8 aspect-square" src="/assets/logo_two.png" alt="Thumbly logo" width={32} height={32} />
                            <span className="text-xl font-bold text-white group-hover:text-pink-500 transition">thumbly</span>
                        </Link>
                    </motion.div>

                    {/* Center: Quote */}
                    <motion.div
                        className="flex-1 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <p className="text-sm text-slate-400 italic max-w-md mx-auto">
                            "Create thumbnails that stop the scroll and start the click."
                        </p>
                    </motion.div>

                    {/* Right: LinkedIn + Copyright */}
                    <motion.div
                        className="flex items-center gap-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <a 
                            href="https://www.linkedin.com/in/shubham-kumar-77a1b1334/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-pink-500 transition-colors" 
                            aria-label="LinkedIn Profile"
                        >
                            <LinkedinIcon className="size-5" />
                        </a>
                        <p className="text-xs text-slate-500">© {new Date().getFullYear()} Shubhzx</p>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}