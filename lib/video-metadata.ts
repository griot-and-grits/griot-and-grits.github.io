export interface Location {
    name: string;
    coordinates: [number, number];
}

export interface TagWithPopularity {
    name: string;
    popularity: number;
}

export interface PersonWithPopularity {
    name: string;
    popularity: number;
}

export interface Video {
    id: string;
    thumbnail: string;
    title: string;
    interviewees: string[];
    description: string;
    duration: string;
    createdDate: string;
    videoUrl: string;
    locations: Location[];
    tags: string[];
    people: string[];
}

export interface VideoMetadata {
    videos: Video[];
}

export interface FilterMetadata {
    tags: TagWithPopularity[];
    people: PersonWithPopularity[];
}

export function getAllTags(videos: Video[], filters: FilterMetadata): TagWithPopularity[] {
    const usedTags = new Set<string>();
    
    videos.forEach(video => {
        video.tags.forEach(tag => {
            usedTags.add(tag);
        });
    });
    
    return filters.tags
        .filter(tag => usedTags.has(tag.name))
        .sort((a, b) => b.popularity - a.popularity);
}

export function getAllPeople(videos: Video[], filters: FilterMetadata): PersonWithPopularity[] {
    const usedPeople = new Set<string>();
    
    videos.forEach(video => {
        video.people.forEach(person => {
            usedPeople.add(person);
        });
    });
    
    return filters.people
        .filter(person => usedPeople.has(person.name))
        .sort((a, b) => b.popularity - a.popularity);
}

export function getAllLocations(videos: Video[]): string[] {
    return [...new Set(videos.flatMap(video => video.locations.map(loc => loc.name)))];
}

export function filterVideos(
    videos: Video[],
    searchQuery: string,
    selectedFilters: string[],
    selectedLocation: string | null
): Video[] {
    let filtered = videos;

    if (searchQuery) {
        filtered = filtered.filter(video => 
            video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            video.interviewees.some(interviewee => interviewee.toLowerCase().includes(searchQuery.toLowerCase())) ||
            video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
            video.people.some(person => person.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }

    if (selectedFilters.length > 0) {
        filtered = filtered.filter(video =>
            selectedFilters.some(filter =>
                video.tags.some(tag => tag === filter) ||
                video.people.some(person => person === filter)
            )
        );
    }

    if (selectedLocation) {
        filtered = filtered.filter(video => 
            video.locations.some(loc => loc.name === selectedLocation)
        );
    }

    // Always sort by creation date in descending order (newest first)
    filtered.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());

    return filtered;
}