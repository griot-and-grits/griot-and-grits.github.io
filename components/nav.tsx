"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Facebook, 
    Twitter, 
    Instagram, 
    Dribbble, 
    X 
} from 'lucide-react';

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const socialLinks = [
        { Icon: Facebook, href: "facebook.com" },
        { Icon: Twitter, href: "twitter.com" },
        { Icon: Instagram, href: "instagram.com" },
        { Icon: Dribbble, href: "dribble.com" }
    ];

    const navLinks = [
        { label: 'Home', href: '#home' },
        { label: 'Our Purpose', href: '#about' },
        { label: 'Work of the Project', href: '#services' },
        { label: 'Works', href: '#works' },
        { label: 'Contributing', href: '#contact' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100
        }
        },
        hover: {
        scale: 1.05,
        color: "#cc147f",
        transition: { duration: 0.3 }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
        opacity: 1, 
        x: 0,
        transition: { 
            type: "spring", 
            stiffness: 100 
        }
        }
    };

    return (
        <nav className={`fixed w-full z-50 top-6 transition-all duration-300 ${isMenuOpen ? 'bg-black' : 'bg-transparent'}`}>
        {/* Logo */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute left-10 top-1/2 -translate-y-1/2 z-60"
        >
            <Link href="#home" className="block">
                <Image 
                    src="/icon.png" 
                    alt="Griot and Grits Logo" 
                    width={150} 
                    height={110} 
                    className="w-20 max-w-full h-auto"
                />
                <Image 
                    src="/logo.png" 
                    alt="Griot and Grits Logo" 
                    width={150} 
                    height={110} 
                    className="w-20 max-w-full mt-2 h-auto"
            />
            </Link>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={toggleMenu}
            className="fixed right-10 rounded-full bg-black w-12 h-11 flex items-center justify-center z-60 group"
        >
            <div className="relative w-[20px] h-[2px] bg-white transition-all duration-300 group-hover:bg-pink-600">
            <div className="absolute -top-[9px] w-full h-full bg-inherit group-hover:bg-pink-600"></div>
            <div className="absolute -bottom-[9px] w-full h-full bg-inherit group-hover:bg-pink-600"></div>
            </div>
        </motion.button>

        {/* Navigation Drawer */}
        <AnimatePresence>
            {isMenuOpen && (
            <motion.nav 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween" }}
                className="fixed top-0 right-0 w-[280px] h-full bg-black text-white transform"
            >
                {/* Close Button */}
                <motion.button 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={toggleMenu}
                className="absolute top-9 right-8 w-8 h-8 bg-black/30 rounded flex items-center justify-center"
                >
                <X className="w-5 h-5 text-white" />
                </motion.button>

                <div className="p-10 overflow-y-auto h-full">
                <motion.h3 
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-xs uppercase tracking-widest text-pink-600 mt-1 mb-12"
                >
                    Griot and Grits
                </motion.h3>

                {/* Navigation Links */}
                <motion.ul 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="border-y border-white/10"
                >
                    {navLinks.map((link, index) => (
                    <motion.li 
                        key={index} 
                        variants={itemVariants}
                        whileHover="hover"
                        className="border-b list-disc border-white/5 last:border-b-0"
                    >
                        <Link 
                            href={link.href} 
                            className="block py-4 text-lg text-white/50 hover:text-white transition-colors"
                        >
                        {link.label}
                        </Link>
                    </motion.li>
                    ))}
                </motion.ul>

                <motion.p 
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-sm text-white/50 my-8"
                >
                    Perspiciatis hic praesentium nesciunt. Et neque a dolorum <a href="#" className="text-pink-600">voluptatem</a> porro iusto sequi veritatis libero enim.
                </motion.p>

                {/* Social Links */}
                <motion.ul 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex space-x-4 text-white/50"
                >
                    {socialLinks.map(({ Icon, href }) => (
                    <motion.li 
                        key={href}
                        variants={itemVariants}
                        whileHover="hover"
                    >
                        <Link 
                            href={href} 
                            className="hover:text-white transition-colors"
                        >
                        <Icon className="w-6 h-6" />
                        </Link>
                    </motion.li>
                    ))}
                </motion.ul>
                </div>
            </motion.nav>
            )}
        </AnimatePresence>
        </nav>
    );
};

export default Nav;