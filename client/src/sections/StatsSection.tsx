import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import SectionTitle from "../components/SectionTitle";
import { useEffect, useRef } from "react";

interface StatCardProps {
    label: string;
    value: number;
    suffix?: string;
    delay?: number;
}

function AnimatedCounter({ value }: { value: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100,
    });
    const isInView = useInView(ref, { once: true, margin: "0px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [motionValue, isInView, value]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Intl.NumberFormat("en-US").format(
                    Math.floor(latest)
                );
            }
        });
    }, [springValue]);

    return <span ref={ref} />;
}

function StatCard({ label, value, suffix = "", delay = 0 }: StatCardProps) {
    return (
        <motion.div
            className="relative group"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-pink-950/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-pink-950 hover:border-pink-900 transition-all duration-300">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-pink-600/30 blur-2xl rounded-full" />
                        <h3 className="relative text-5xl md:text-7xl font-bold bg-gradient-to-br from-pink-500 to-pink-600 bg-clip-text text-transparent">
                            <AnimatedCounter value={value} />
                            {suffix}
                        </h3>
                    </div>
                    <p className="text-lg md:text-xl text-slate-400 font-medium">
                        {label}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default function StatsSection() {
    return (
        <div id="stats" className="px-4 md:px-16 lg:px-24 xl:px-32 py-20">
            <SectionTitle
                text1="Our Impact"
                text2="Trusted by creators worldwide"
                text3="Join thousands of content creators who are generating stunning thumbnails with AI."
            />

            <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <StatCard
                    label="Thumbnails Generated"
                    value={152847}
                    suffix="+"
                    delay={0}
                />
                <StatCard
                    label="Users Onboarded"
                    value={8432}
                    suffix="+"
                    delay={0.15}
                />
            </div>

            {/* Additional decorative elements */}
            <div className="relative max-w-4xl mx-auto mt-20">
                <motion.div
                    className="absolute -z-10 size-96 -top-20 left-1/2 -translate-x-1/2 aspect-square rounded-full bg-pink-500/20 blur-3xl"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                />
                <motion.div
                    className="text-center space-y-6"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                >
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                        Our AI-powered thumbnail generator helps creators boost their click-through rates
                        and grow their channels faster than ever before.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
                        <div className="flex items-center gap-2">
                            <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                                <polyline points="16 7 22 7 22 13"></polyline>
                            </svg>
                            <span className="text-slate-400">99.9% Uptime</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                            </svg>
                            <span className="text-slate-400">Lightning Fast</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                            <span className="text-slate-400">Fully Customizable</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

