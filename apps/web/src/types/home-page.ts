import type { PropertyImage } from "./property";
import type { Testimonial } from "./testimonial";

export type FAQItem = {
  question: string;
  answer: string;
};

export type HomePageContent = {
  testimonialsEnabled?: boolean;
  testimonials?: Testimonial[];
  faqsEnabled?: boolean;
  faqsTitle?: string;
  faqsDescription?: string;
  faqsImages?: PropertyImage[];
  faqs?: FAQItem[];
};

