"use client"

import type React from "react";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MasonryGallery, MasonryItem } from "./masonry-gallery";

const FeaturedStories: React.FC = () => {
  const controls = useAnimation()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <section className="pt-20 overflow-hidden">
      <div className="container mx-auto px-4">        
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-pink-600 tracking-widest font-semibold text-sm uppercase max-w-4xl mx-auto mb-4"
        >
          / Featured Stories
      </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left mb-12"
        >
          <h2 className="max-w-4xl mx-auto text-4xl font-bold mb-4">Discover the rich tapestry of African American experiences</h2>
        </motion.div>

        <div className="max-w-screen-lg mx-auto">
      <MasonryGallery>
        <MasonryItem 
          src="cld-sample"
          alt="Project 1"
          title="First Project"
          description="Description of the first project"
          link="/project1"
        />
        <MasonryItem 
          src="cld-sample-2"
          alt="Project 1"
          title="First Project"
          description="Description of the first project"
          link="/project1"
        />
        <MasonryItem 
          src="cld-sample-3"
          alt="Project 1"
          title="First Project"
          description="Description of the first project"
          link="/project1"
        />
        <MasonryItem 
          src="cld-sample-4"
          alt="Project 1"
          title="First Project"
          description="Description of the first project"
          link="/project1"
        />
        <MasonryItem 
          src="cld-sample-5"
          alt="Project 1"
          title="First Project"
          description="Description of the first project"
          link="/project1"
        />
        <MasonryItem 
          src="cld-sample"
          alt="Project 1"
          title="First Project"
          description="Description of the first project"
          link="/project1"
        />
      </MasonryGallery>
    </div>
      </div>
    </section>
  )
}

export default FeaturedStories

