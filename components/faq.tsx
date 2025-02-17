import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faqItems } from "@/lib/constants"
import { convertLinksToAnchors } from "@/lib/utils"

type FAQItem = {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
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
