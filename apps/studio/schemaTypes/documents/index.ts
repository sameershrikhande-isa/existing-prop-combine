import { agent } from "./agent";
import { author } from "./author";
import { blog } from "./blog";
import { blogIndex } from "./blog-index";
import { faq } from "./faq";
import { footer } from "./footer";
import { homePage } from "./home-page";
import { navbar } from "./navbar";
import { page } from "./page";
import { property } from "./property";
import { propertyType } from "./property-type";
import { redirect } from "./redirect";
import { settings } from "./settings";

export const singletons = [homePage, blogIndex, settings, footer, navbar];

export const documents = [
  agent,
  author,
  blog,
  faq,
  page,
  property,
  propertyType,
  redirect,
  ...singletons,
];
