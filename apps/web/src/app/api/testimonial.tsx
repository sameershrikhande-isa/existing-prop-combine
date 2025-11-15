import type { Testimonial } from "@/types/testimonial"

// Type that allows string paths for legacy testimonials
type TestimonialWithStringImage = Omit<Testimonial, 'image' | 'purpose'> & {
  image: string;
  purpose?: 'buyer' | 'renter';
  position?: string;
};

export const testimonials: TestimonialWithStringImage[] = [
  {
    image: '/images/testimonial/smiths.jpg',
    name: 'Shankar & Rekha Kale',
    review: 'Found my ideal home fast! Listings were accurate, photos matched, and the process was seamless. Great customer service — will use again!',
    position: 'Buyer',
    purpose: 'buyer',
  },
  {
    image: '/images/testimonial/johns.jpg',
    name: 'Rajesh & Priya Patel',
    review: 'Quickly found my dream home! Accurate listings, smooth process, and amazing support. Definitely using this platform again!',
    position: 'Buyer',
    purpose: 'buyer',
  },
]