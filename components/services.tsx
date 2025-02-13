"use client"

import type React from "react"
import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const services = [
    { icon: "📚", title: "Centralized Repository", description: "Upload and store video and audio recordings" },
    { icon: "🧠", title: "AI Metadata Extraction", description: "Extract key events and metadata using AI" },
    { icon: "🌐", title: "Content Enrichment", description: "Enhance information from public domain using the assistance of AI" },
    { icon: "🔍", title: "AI Annotation", description: "Annotate recordings with enriched content" },
    { icon: "🤖", title: "Generative AI Enhancement", description: "Further enrich content with contextual information" },
    { icon: "🔎", title: "Searchable Index", description: "Build an index of searchable content based on the metadata and key events" },
    ]

    const Services: React.FC = () => {
    const controls = useAnimation()
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    useEffect(() => {
        if (inView) {
        controls.start("visible")
        }
    }, [controls, inView])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
        },
        },
    }

    return (
        <section id="services" className="py-20 w-full bg-gradient-to-br from-gray-100 to bg-pink-50 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4">
            <motion.h2
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-pink-600 text-sm uppercase max-w-4xl mx-auto tracking-widest font-bold text-center mb-4"
            >
                / Work Of The Project
            </motion.h2>
            <motion.h2
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-lg font-bold text-neutral-500 max-w-4xl mx-auto text-center mb-4"
            >
                Bringing the African American experience to life for our generation and generations to come through:
            </motion.h2>
            <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
            {services.map((service, index) => (
                <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-xl backdrop-filter backdrop-blur-lg bg-white bg-opacity-10 border border-white border-opacity-20 shadow-xl transition-all duration-300 hover:bg-opacity-20"
                whileHover={{ scale: 1.05 }}
                >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-500">{service.description}</p>
                </motion.div>
            ))}
            </motion.div>
        </div>
        </section>
    )
}

export default Services;

