import { Icon } from '@iconify/react';
import Image from 'next/image';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { urlFor } from "@/lib/sanity/client";
import type { PropertyImage } from "@/types/property";
import type { FAQItem } from "@/types/home-page";

type FAQProps = {
  title?: string;
  description?: string;
  images?: PropertyImage[];
  faqs?: FAQItem[];
};

const FAQ = ({ title, description, images, faqs }: FAQProps) => {
    // Use first image from the array, or fallback to static image
    const mainImage = images && images.length > 0 ? images[0] : null;
    const imageUrl = mainImage ? urlFor(mainImage).width(680).height(644).url() : "/images/faqs/faq-image.png";
    const defaultTitle = title || "Most Frequently Asked Questions";
    const defaultDescription = description || "We know that buying, selling, or investing in real estate can be overwhelming. Here are some frequently asked questions to help guide you through the process";
    const faqsList = faqs || [];

    return (
        <section id='faqs'>
            <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
                <div className="grid lg:grid-cols-2 gap-10 ">
                    <div className='lg:mx-0 mx-auto'>
                        <Image
                            src={imageUrl}
                            alt={mainImage?.alt || 'FAQ image'}
                            width={680}
                            height={644}
                            className='lg:w-full'
                            unoptimized={true}
                        />
                    </div>
                    <div className='lg:px-12'>
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2">
                            <Icon icon="ph:house-simple-fill" className="text-2xl text-primary " />
                            FAQs
                        </p>
                        <h2 className='lg:text-52 text-40 leading-[1.2] font-medium text-dark dark:text-white'>
                            {defaultTitle}
                        </h2>
                        <p className='text-dark/50 dark:text-white/50 pr-20'>
                            {defaultDescription}
                        </p>
                        {faqsList.length > 0 && (
                            <div className="my-8">
                                <Accordion type="single" defaultValue="item-1" collapsible className="w-full flex flex-col gap-6">
                                    {faqsList.map((faq, index) => (
                                        <AccordionItem key={index} value={`item-${index + 1}`}>
                                            <AccordionTrigger>{index + 1}. {faq.question}</AccordionTrigger>
                                            <AccordionContent>
                                                {faq.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
