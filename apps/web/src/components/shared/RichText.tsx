import type { PortableTextBlock } from "next-sanity";
import { PortableText, type PortableTextComponents } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/client";

type RichTextProps = {
  richText?: PortableTextBlock[];
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-dark dark:text-white text-xm mb-5">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-dark dark:text-white mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium text-dark dark:text-white mt-6 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-medium text-dark dark:text-white mt-4 mb-2">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-base font-medium text-dark dark:text-white mt-3 mb-2">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-sm font-medium text-dark dark:text-white mt-2 mb-1">
        {children}
      </h6>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-dark/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    customLink: ({ value, children }) => {
      const href = value?.customLink?.href || "#";
      const openInNewTab = value?.customLink?.openInNewTab;

      return (
        <Link
          href={href}
          target={openInNewTab ? "_blank" : "_self"}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
          className="text-primary underline hover:text-primary/80 transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-5 space-y-2 text-dark dark:text-white">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-5 space-y-2 text-dark dark:text-white">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="text-xm">{children}</li>,
    number: ({ children }) => <li className="text-xm">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      if (!value) return null;

      const imageUrl = urlFor(value).width(800).url();

      return (
        <figure className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || "Property image"}
            width={800}
            height={600}
            className="rounded-2xl w-full h-auto"
            unoptimized={true}
          />
          {value.caption && (
            <figcaption className="mt-2 text-sm text-dark/50 dark:text-white/50 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function RichText({ richText }: RichTextProps) {
  if (!richText || richText.length === 0) {
    return null;
  }

  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={richText} components={components} />
    </div>
  );
}

