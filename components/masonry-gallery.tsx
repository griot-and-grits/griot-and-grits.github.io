import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
    <div className="masonry-gallery grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="relative overflow-hidden rounded-lg group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={{ 
          scale: isHovered ? 1.05 : 1,
          opacity: isHovered ? 0.7 : 1
        }}
        transition={{ duration: 0.3 }}
        className="w-full h-full"
      >
        <CustomImage 
          src={src} 
          alt={alt} 
          className="rounded-lg object-cover"
        />
      </motion.div>

      {/* Overlay Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 20 
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/50 text-white p-6 flex flex-col justify-end"
      >
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm mb-4">{description}</p>
        
        {link && (
          <motion.a
            href={link}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg self-start"
          >
            Learn More
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );
};