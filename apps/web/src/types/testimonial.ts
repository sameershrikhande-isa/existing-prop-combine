import type { PropertyImage } from "./property";

export type Testimonial = {
  review: string;
  name: string;
  purpose: "buyer" | "renter";
  image: PropertyImage;
};