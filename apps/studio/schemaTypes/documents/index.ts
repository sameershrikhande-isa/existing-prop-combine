import { agent } from "./agent";
import { amenity } from "./amenity";
import { author } from "./author";
import { blog } from "./blog";
import { blogIndex } from "./blog-index";
import { faq } from "./faq";
import { filterDimension } from "./filter-dimension";
import { filterRange } from "./filter-range";
import { filterScope } from "./filter-scope";
import { footer } from "./footer";
import { homePage } from "./home-page";
import { navbar } from "./navbar";
import { page } from "./page";
import { property } from "./property";
import { propertyType } from "./property-type";
import { purpose } from "./purpose";
import { redirect } from "./redirect";
import { settings } from "./settings";

export const singletons = [homePage, blogIndex, settings, footer, navbar];

export const documents = [
  agent,
  amenity,
  author,
  blog,
  faq,
  filterDimension,
  filterRange,
  filterScope,
  page,
  property,
  propertyType,
  purpose,
  redirect,
  ...singletons,
];
