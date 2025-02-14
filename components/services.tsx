"use client"

import React from "react"
import { useEffect } from "react"
import { motion, useAnimation, Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Service {
  icon: string
  title: string
  excerpt: string
  description: string
}

interface ServiceCardProps {
  service: Service
  variants: Variants
}

const services: Service[] = [
    {   
        icon: "📚", 
        title: "Centralized Repository",
        excerpt: "A unified storage solution for seamless data management and access.",
        description: `A centralized repository is a single storage location for data, documents, or code. It provides a unified point of access, ensuring 
        consistency and facilitating collaboration across an organization.`
    },
    {   
        icon: "🧠", 
        title: "AI Metadata Extraction",
        excerpt: "Intelligent extraction of metadata to enhance data organization.",
        description: `AI metadata extraction involves using artificial intelligence to automatically collect and organize metadata from various data sources. 
        This process enhances data management by extracting relevant information such as names, definitions, context, and technical attributes.` 
    },
    {   
        icon: "🌐",
        title: "Content Enrichment",
        excerpt: "Advanced AI techniques for comprehensive content enhancement.",
        description: `Content enrichment is the process of applying advanced techniques like machine learning and AI to automatically extract meaningful 
        information from documents. It involves creating fully-enriched products with extensive, customer-centric attributes. This process improves 
        searchability, enhances product discovery, and provides valuable insights for better decision-making.`
    },
    {   
        icon: "🔍", 
        title: "AI Annotation",
        excerpt: "Smart labeling system for enhanced machine learning comprehension.",
        description: `AI annotation is the practice of labeling or tagging data to make it comprehensible for machine learning models. It involves adding 
        metadata or labels to various data types, including images, text, audio, or video.`
    },
    {   
        icon: "🤖", 
        title: "Generative AI Enhancement",
        excerpt: "Cutting-edge AI models for automated process optimization.",
        description: `Generative AI models can enhance various aspects of data processing, transformation, and analysis. They can automate repetitive tasks, 
        improve decision-making, and boost productivity across industries.` 
    },
    {   
        icon: "🔎", 
        title: "Searchable Index",
        excerpt: "Optimized data indexing for efficient information retrieval.",
        description: `A searchable index is a structured collection of data optimized for quick and efficient information retrieval. It contains searchable 
        content available for indexing, full-text search, vector search, and filtered queries.`
    },
]

const ServiceCard: React.FC<ServiceCardProps> = ({ service, variants }) => {
  return (
    <motion.div
      variants={variants}
      className="p-6 rounded-xl backdrop-filter backdrop-blur-lg bg-white bg-opacity-10 border border-white border-opacity-20 shadow-xl transition-all duration-300 hover:bg-opacity-20"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-4xl mb-4">{service.icon}</div>
      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{service.excerpt}</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Learn More
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">{service.icon}</span>
              {service.title}
            </DialogTitle>
          </DialogHeader>
          <div className="text-sm text-gray-600">
            {service.description}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

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

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants: Variants = {
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
        <section id="services" className="py-20 w-full bg-gradient-to-br from-gray-100 to bg-orange-50 overflow-hidden">
            <div className="container max-w-7xl mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-[#a94728] text-sm uppercase max-w-4xl mx-auto tracking-widest font-bold text-center mb-4"
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
                        <ServiceCard key={index} service={service} variants={itemVariants} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Services