import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { navlinks } from "../data/navlinks";
import type { INavLink } from "../types";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.nav className="fixed top-5 z-50 flex items-center justify-between w-full max-w-[1440px] py-4 px-6 md:px-16 lg:px-24 xl:px-6 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl mx-auto left-1/2 -translate-x-1/2 shadow-lg shadow-black/20" 
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
            >
                <a href="/" className="flex items-center gap-2 flex-shrink-0">
                    <img className="size-8 aspect-square" src="/assets/heroIcon.png" alt="logo" />
                    <span className="text-2xl font-bold">thumbly</span>
                </a>

                <div className="hidden md:flex items-center gap-8 transition duration-500 flex-1 justify-center">
                    {navlinks.map((link: INavLink) => (
                        <NavLink key={link.name} to={link.href} className="hover:text-pink-500 transition">
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                <button className="hidden md:block px-6 py-2.5 bg-pink-600 hover:bg-pink-700 active:scale-95 transition-all rounded-full flex-shrink-0">
                    Start free trial
                </button>
                <button onClick={() => setIsOpen(true)} className="md:hidden" aria-label="Open menu">
                    <MenuIcon size={26} className="active:scale-90 transition" />
                </button>
            </motion.nav>

            <div className={`fixed inset-0 z-100 bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-400 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                {navlinks.map((link: INavLink) => (
                    <NavLink key={link.name} to={link.href} onClick={() => setIsOpen(false)}>
                        {link.name}
                    </NavLink>
                ))}
                <button onClick={() => setIsOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-pink-600 hover:bg-pink-700 transition text-white rounded-md flex" aria-label="Close menu">
                    <XIcon />
                </button>
            </div>
        </>
    );
}