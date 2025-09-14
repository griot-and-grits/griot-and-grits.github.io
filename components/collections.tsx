"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
    Search, 
    Filter, 
    MapPin, 
    MessageSquare,
    Play,
    Clock,
    User,
    Tag,
    X
} from 'lucide-react';
import { 
    Video, 
    Location,
    getAllTags, 
    getAllTopics, 
    getAllPeople, 
    getAllLocations, 
    filterVideos 
} from '@/lib/video-metadata';
import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues
const InteractiveMap = dynamic(() => import('./interactive-map'), {
    ssr: false,
    loading: () => (
        <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
            <div className="text-muted-foreground">Loading map...</div>
        </div>
    )
});

interface CollectionsProps {
    videos: Video[];
}

const Collections: React.FC<CollectionsProps> = ({ videos }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [showMap, setShowMap] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);
    const [chatMessage, setChatMessage] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [filteredVideos, setFilteredVideos] = useState<Video[]>(videos);
    const [expandedTags, setExpandedTags] = useState<{ [videoId: string]: boolean }>({});

    const allTags = getAllTags(videos);
    const allTopics = getAllTopics(videos);
    const allPeople = getAllPeople(videos);
    const allLocations = getAllLocations(videos);

    useEffect(() => {
        setFilteredVideos(videos);
    }, [videos]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        updateFilteredVideos(query, selectedFilters, selectedLocation);
    };

    const handleFilterToggle = (filter: string) => {
        const newFilters = selectedFilters.includes(filter) 
            ? selectedFilters.filter(f => f !== filter)
            : [...selectedFilters, filter];
        setSelectedFilters(newFilters);
        updateFilteredVideos(searchQuery, newFilters, selectedLocation);
    };

    const handleLocationSelect = (location: string | null) => {
        setSelectedLocation(location);
        updateFilteredVideos(searchQuery, selectedFilters, location);
    };

    const updateFilteredVideos = (query: string, filters: string[], location: string | null) => {
        const filtered = filterVideos(videos, query, filters, location);
        setFilteredVideos(filtered);
    };

    const toggleTagExpansion = (videoId: string) => {
        setExpandedTags(prev => ({
            ...prev,
            [videoId]: !prev[videoId]
        }));
    };

    return (
        <section id="collections" className="py-20 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6">
                        Our Collection
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Explore our archive of oral history videos, preserving the stories and experiences 
                        that shape our communities and culture.
                    </p>
                </motion.div>

                {/* Search and Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search videos, people, topics, or descriptions..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-ring focus:border-ring"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowMap(!showMap)}
                                className={`px-4 py-3 rounded-lg border flex items-center gap-2 transition-colors ${
                                    showMap 
                                        ? 'bg-primary text-primary-foreground border-primary' 
                                        : 'bg-card text-foreground border-border hover:bg-accent'
                                }`}
                            >
                                <MapPin className="w-5 h-5" />
                                Map
                            </button>
                            <button
                                onClick={() => setShowChatbot(!showChatbot)}
                                className={`px-4 py-3 rounded-lg border flex items-center gap-2 transition-colors ${
                                    showChatbot 
                                        ? 'bg-primary text-primary-foreground border-primary' 
                                        : 'bg-card text-foreground border-border hover:bg-accent'
                                }`}
                            >
                                <MessageSquare className="w-5 h-5" />
                                Ask the Griot
                            </button>
                        </div>
                    </div>

                    {/* Map View - Shows directly below buttons */}
                    {showMap && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 bg-card border border-border rounded-lg p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-foreground">Video Locations</h3>
                                {selectedLocation && (
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>Filtering by:</span>
                                        <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs">
                                            📍 {selectedLocation}
                                        </span>
                                        <button
                                            onClick={() => handleLocationSelect(null)}
                                            className="text-xs text-muted-foreground hover:text-foreground"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <InteractiveMap 
                                videos={videos}
                                onLocationClick={handleLocationSelect}
                                selectedLocation={selectedLocation}
                            />
                            <div className="mt-4 text-sm text-muted-foreground">
                                <p>Click on map pins to filter videos by location. Each pin shows videos recorded in that area.</p>
                            </div>
                        </motion.div>
                    )}

                    {/* Griot AI Interface - Shows directly below buttons */}
                    {showChatbot && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 bg-card border border-border rounded-lg p-6"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                    <span className="text-primary-foreground font-bold text-lg">🪘</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">The Griot</h3>
                                    <p className="text-sm text-muted-foreground">Your guide to our oral history collection</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-muted rounded-lg p-4">
                                    <div className="text-foreground text-sm">
                                        <p className="mb-2">
                                            <em>"Greetings, friend. I am the keeper of these stories, the voices that echo through time. 
                                            I've spent countless hours listening, learning, and cataloging the experiences that shape our communities."</em>
                                        </p>
                                        <p className="text-muted-foreground text-xs mb-3">
                                            Tell me what stories you seek, and I'll guide you to the voices that speak to your heart and mind.
                                        </p>
                                        <div className="flex flex-wrap gap-2 text-xs">
                                            <button 
                                                onClick={() => setChatMessage("Tell me about stories of resilience during difficult times")}
                                                className="bg-secondary text-secondary-foreground px-2 py-1 rounded hover:bg-secondary/80"
                                            >
                                                "Stories of resilience"
                                            </button>
                                            <button 
                                                onClick={() => setChatMessage("Show me videos about family traditions and cultural heritage")}
                                                className="bg-secondary text-secondary-foreground px-2 py-1 rounded hover:bg-secondary/80"
                                            >
                                                "Cultural heritage"
                                            </button>
                                            <button 
                                                onClick={() => setChatMessage("Find stories about community leaders and changemakers")}
                                                className="bg-secondary text-secondary-foreground px-2 py-1 rounded hover:bg-secondary/80"
                                            >
                                                "Community leaders"
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Tell the Griot what stories you're seeking..."
                                        value={chatMessage}
                                        onChange={(e) => setChatMessage(e.target.value)}
                                        className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                                    />
                                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4" />
                                        Ask
                                    </button>
                                </div>
                                {chatMessage && (
                                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-sm">
                                        <div className="flex items-start gap-2">
                                            <span className="text-lg">🪘</span>
                                            <div>
                                                <p className="text-foreground mb-2">
                                                    <em>"I understand you're looking for: '{chatMessage}'"</em>
                                                </p>
                                                <p className="text-muted-foreground text-xs">
                                                    The Griot is analyzing our collection to find the most relevant stories... 
                                                    In a full implementation, this would use AI to search and filter the videos based on your request.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* Filter Bar - Always above videos */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-8 space-y-4"
                >
                    {/* Filter Tags */}
                    <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            Filters:
                        </span>
                        {[...allTopics, ...allTags, ...allPeople].slice(0, 12).map(filter => (
                            <button
                                key={filter}
                                onClick={() => handleFilterToggle(filter)}
                                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                                    selectedFilters.includes(filter)
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'bg-card text-foreground border-border hover:bg-accent'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Active Filters */}
                    {(selectedFilters.length > 0 || selectedLocation) && (
                        <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-sm text-muted-foreground">Active:</span>
                            {selectedFilters.map(filter => (
                                <span
                                    key={filter}
                                    className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center gap-1"
                                >
                                    {filter}
                                    <button onClick={() => handleFilterToggle(filter)}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                            {selectedLocation && (
                                <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center gap-1">
                                    📍 {selectedLocation}
                                    <button onClick={() => handleLocationSelect(null)}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            )}
                        </div>
                    )}
                </motion.div>

                {/* Video Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredVideos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video bg-muted">
                                <Image
                                    src={video.thumbnail}
                                    alt={video.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <button className="bg-white/90 rounded-full p-3 hover:bg-white transition-colors">
                                        <Play className="w-6 h-6 text-black ml-1" />
                                    </button>
                                </div>
                                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {video.duration}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-foreground mb-2">
                                    {video.title}
                                </h3>
                                
                                <div className="flex items-center text-sm text-muted-foreground mb-3">
                                    <User className="w-4 h-4 mr-2" />
                                    <div className="flex flex-wrap gap-1">
                                        {video.interviewees.map((interviewee, index) => (
                                            <span key={interviewee}>
                                                {interviewee}
                                                {index < video.interviewees.length - 1 && ', '}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                                    {video.description}
                                </p>

                                <div className="flex items-center text-sm text-muted-foreground mb-4">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <div className="flex flex-wrap gap-1">
                                        {video.locations.map((location, index) => (
                                            <span key={location.name}>
                                                {location.name}
                                                {index < video.locations.length - 1 && '; '}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="relative flex flex-wrap gap-2 mb-4">
                                    {(expandedTags[video.id] ? video.tags : video.tags.slice(0, 3)).map(tag => (
                                        <span
                                            key={tag}
                                            className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs flex items-center gap-1"
                                        >
                                            <Tag className="w-3 h-3" />
                                            {tag}
                                        </span>
                                    ))}
                                    {video.tags.length > 3 && (
                                        <button
                                            onClick={() => toggleTagExpansion(video.id)}
                                            className="text-xs text-primary hover:text-primary/80 underline cursor-pointer"
                                        >
                                            {expandedTags[video.id] 
                                                ? 'Show less' 
                                                : `+${video.tags.length - 3} more`
                                            }
                                        </button>
                                    )}
                                </div>

                                <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/80 transition-colors">
                                    Watch Video
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* No Results */}
                {filteredVideos.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="text-muted-foreground mb-4">
                            <Search className="w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold">No videos found</h3>
                            <p>Try adjusting your search or filters to find more content.</p>
                        </div>
                    </motion.div>
                )}

                {/* Results Count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mt-12 text-muted-foreground"
                >
                    <p>
                        Showing {filteredVideos.length} of {videos.length} videos
                        {(searchQuery || selectedFilters.length > 0 || selectedLocation) && (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedFilters([]);
                                    setSelectedLocation(null);
                                    setFilteredVideos(videos);
                                }}
                                className="ml-4 text-primary hover:text-primary/80 underline"
                            >
                                Clear all filters
                            </button>
                        )}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Collections;