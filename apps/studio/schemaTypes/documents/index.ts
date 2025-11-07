import { amenity } from "./amenity";
import { contactInfo } from "./contact-info";
import { faq } from "./faq";
import { filterDimension } from "./filter-dimension";
import { filterRange } from "./filter-range";
import { filterScope } from "./filter-scope";
import { footer } from "./footer";
import { homePage } from "./home-page";
import { navbar } from "./navbar";
import { property } from "./property";
import { propertyType } from "./property-type";
import { purpose } from "./purpose";
import { redirect } from "./redirect";
import { settings } from "./settings";

export const singletons = [settings, footer, navbar, homePage, contactInfo];

export const documents = [
  amenity,
  faq,
  filterDimension,
  filterRange,
  filterScope,
  property,
  propertyType,
  purpose,
  redirect,
  ...singletons,
];
