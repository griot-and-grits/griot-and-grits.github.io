import Collections from '@/components/collections';
import Nav from '@/components/nav';
import { loadVideoMetadata, loadFilterMetadata } from '@/lib/load-metadata';

export default function CollectionsPage() {
    const videoMetadata = loadVideoMetadata();
    const filterMetadata = loadFilterMetadata();
    
    return (
        <>
            <Nav />
            <Collections videos={videoMetadata.videos} filters={filterMetadata} />
        </>
    );
}