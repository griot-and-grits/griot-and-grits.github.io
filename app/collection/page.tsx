import Collections from '@/components/collections';
import Nav from '@/components/nav';
import { loadVideoMetadata } from '@/lib/load-metadata';

export default function CollectionsPage() {
    const metadata = loadVideoMetadata();
    
    return (
        <>
            <Nav />
            <Collections videos={metadata.videos} />
        </>
    );
}