"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomImage from './custom-image';

interface GalleryItemProps {
  src: string;
  alt: string;
  title: string;
  description: string;
  link?: string;
}

export const MasonryGallery: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="masonry-gallery grid grid-cols-2 md:grid-cols-2 gap-4">
      {children}
    </div>
  );
};

export const MasonryItem: React.FC<GalleryItemProps> = ({ 
  src, 
  alt, 
  title, 
  description, 
  link 
}) => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <motion.div 
      className="relative overflow-hidden rounded-lg group"
      onHoverStart={() => setIsActive(true)}
      onHoverEnd={() => setIsActive(false)}
      onTap={toggleActive}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={{ 
          scale: isActive ? 1.05 : 1,
          opacity: isActive ? 0.7 : 1
        }}
        transition={{ duration: 0.3 }}
        className="w-full h-full"
      >
        <CustomImage 
          src={src} 
          alt={alt} 
          className="rounded-lg object-cover aspect-square md:aspect-[16/9]"
        />
      </motion.div>

      {/* Overlay Content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 text-white p-2 flex flex-col justify-end bg-opacity-50"
          >
            <h3 className="text-sm leading-snug md:text-lg font-bold">{title}</h3>
            <p className="text-xs mb-2 line-clamp-3">{description}</p>
            
            {link && (
              <motion.a
                href={link}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#a94728] text-white px-3 text-xs py-1 md:py-2 rounded-lg self-start"
              >
                Learn More
              </motion.a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};