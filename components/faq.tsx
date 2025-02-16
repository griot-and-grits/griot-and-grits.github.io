import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faqItems } from "@/lib/constants"

type FAQItem = {
    question: string
    answer: string
}

    interface FAQProps {
    items: FAQItem[]
}

function convertLinksToAnchors(text: string): string {
    // Regex for emails
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
    // Regex for URLs
    const urlRegex = /(https?:\/\/[^\s]+)/gi

    // Replace emails with mailto links
    text = text.replace(emailRegex, '<a href="mailto:$1" class="text-blue-500 hover:underline">$1</a>')

    // Replace URLs with clickable links
    text = text.replace(
        urlRegex,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">$1</a>',
    )

    return text
}

export function FAQItem({ items }: FAQProps) {
    return (
        <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>
                <div dangerouslySetInnerHTML={{ __html: convertLinksToAnchors(item.answer) }} />
            </AccordionContent>
            </AccordionItem>
        ))}
        </Accordion>
    )
}



export default function FAQ() {
    return (
        <main className="flex flex-col items-center justify-between px-4 py-6 md:py-14">
            <div className="z-10 max-w-5xl w-full items-center justify-between text-sm">
                <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                <FAQItem items={faqItems} />
            </div>
        </main>
    )
}
