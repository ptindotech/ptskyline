import type { FaqItem } from "@/content/site-content";

type AccordionListProps = {
  items: readonly FaqItem[];
};

export function AccordionList({ items }: AccordionListProps) {
  return (
    <div className="accordion-list">
      {items.map((item, index) => (
        <details className="accordion-item" key={item.question}>
          <summary>
            <span className="accordion-item__number">{String(index + 1).padStart(2, "0")}</span>
            <span>{item.question}</span>
            <span aria-hidden="true" className="accordion-item__icon" />
          </summary>
          <div className="accordion-item__content"><p>{item.answer}</p></div>
        </details>
      ))}
    </div>
  );
}
