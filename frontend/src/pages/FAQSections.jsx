import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';
import { Edit, Filter, Bug, Server } from 'lucide-react';

// Sample FAQ data
const faqs = [
  {
    icon: Edit,
    question: "How does NoCodeNexus simplify rule creation for non-technical users?",
    answer: "NoCodeNexus offers a no-code rule-writing experience powered by LLM (Large Language Models). Business Analysts can input plain English text, which is transformed into executable queries without requiring programming expertise."
  },
  {
    icon: Filter,
    question: "What are the system requirements?",
    answer: "Our platform works on all modern browsers and devices with an internet connection."
  },
  {
    icon: Bug,
    question: "What types of advanced conditions can be created using NoCodeNexus?",
    answer: "NoCodeNexus provides real-time debugging with features like breakpoints, clear error messages, and query execution tracing. These tools make it easy to identify and fix logical errors in decision rules."
  },
  {
    icon: Server,
    question: "Can NoCodeNexus integrate with other platforms or server-side frameworks?",
    answer: "Yes, NoCodeNexus supports exporting queries to formats like JSON, XML, and SQL. These can be integrated with popular server-side frameworks such as Laravel, Django, or Rails for seamless compatibility."
  }
];

const FAQSection = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <Accordion type="single" collapsible className="w-full bg-card mb-5 flex flex-col gap-6">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`} 
            className="bg-card shadow-md bg-gray-900/50 p-2 md:p-4/5 rounded-2xl backdrop-blur-sm hover:backdrop-blur-lg transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20 border-none"
          >
            <AccordionTrigger 
              className="flex items-center gap-6 px-4 [&[data-state=open]>div]:rotate-180 no-underline hover:no-underline"
            >
              <faq.icon className="w-7 h-7 text-green-500" />
              <span className="text-gray-500 hover:text-white text-xl no-underline">
                {faq.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pl-12 text-gray-300 px-4 text-sm">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQSection;