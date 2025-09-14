import * as yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { VideoMetadata } from './video-metadata';

export function loadVideoMetadata(): VideoMetadata {
    try {
        const metadataPath = path.join(process.cwd(), 'metadata', 'videos.yaml');
        const fileContents = fs.readFileSync(metadataPath, 'utf8');
        const data = yaml.load(fileContents) as VideoMetadata;
        return data;
    } catch (error) {
        console.error('Error loading video metadata:', error);
        return { videos: [] };
    }
}