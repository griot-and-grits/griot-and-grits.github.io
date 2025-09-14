export interface Location {
    name: string;
    coordinates: [number, number];
}

export interface Video {
    id: string;
    thumbnail: string;
    title: string;
    interviewees: string[];
    description: string;
    duration: string;
    locations: Location[];
    tags: string[];
    topics: string[];
    people: string[];
}

export interface VideoMetadata {
    videos: Video[];
}

export function getAllTags(videos: Video[]): string[] {
    return [...new Set(videos.flatMap(video => video.tags))];
}

export function getAllTopics(videos: Video[]): string[] {
    return [...new Set(videos.flatMap(video => video.topics))];
}

export function getAllPeople(videos: Video[]): string[] {
    return [...new Set(videos.flatMap(video => video.people))];
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
            video.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase())) ||
            video.people.some(person => person.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }

    if (selectedFilters.length > 0) {
        filtered = filtered.filter(video =>
            selectedFilters.some(filter =>
                video.tags.includes(filter) ||
                video.topics.includes(filter) ||
                video.people.includes(filter)
            )
        );
    }

    if (selectedLocation) {
        filtered = filtered.filter(video => 
            video.locations.some(loc => loc.name === selectedLocation)
        );
    }

    return filtered;
}