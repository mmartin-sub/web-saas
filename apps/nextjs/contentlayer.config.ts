import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer2/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

/** @type {import('contentlayer/source-files').ComputedFields} */
const defaultComputedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
};

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  // Exclusion using ...!!**/i18n/** not working (or other issue)
  filePathPattern: `content/docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    published: {
      type: "boolean",
      default: true,
    },
  },
  computedFields: defaultComputedFields,
}));

export const Guide = defineDocumentType(() => ({
  name: "Guide",
  filePathPattern: `content/guides/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    featured: {
      type: "boolean",
      default: false,
    },
  },
  computedFields: defaultComputedFields,
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `content/blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    image: {
      type: "string",
      required: false,
    },
    alt_image: {
      type: "string",
      required: false,
    },
    authors: {
      // Reference types are not embedded.
      // Until this is fixed, we can use a simple list.
      // type: "reference",
      // of: Author,
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields: defaultComputedFields,
}));

export const Author = defineDocumentType(() => ({
  name: "Author",
  // We need to exclude the i18n folder, otherwise issue with the build process Please either define a filePathPattern for the given document type definition or provide a valid value for the type field (i.e. the field "type" needs to be one of the following document type names: Page, Doc, Guide, Post, Author).
  filePathPattern: `content/authors/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    avatar: {
      type: "string",
      required: true,
    },
    twitter: {
      type: "string",
      required: false,
    },
  },
  computedFields: defaultComputedFields,
}));

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `content/pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields: defaultComputedFields,
}));

export default makeSource({
  contentDirPath: "./src/content",
  documentTypes: [Page, Doc, Guide, Post, Author],
  onExtraFieldData: 'ignore', // for updatedAt
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node: { children: string | string[] }) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
node.children = [" "];
            }
          },
          onVisitHighlightedLine(node: {
            properties: { className: string[] };
          }) {
            // node.properties.className.push("line--highlighted")

            // FIX: I changed remark-gmf 4.0.0 to 3.0.1 (return a lot errors in mdx?)
            // And solve error on onVisitHighlightedLine with code from : https://stackoverflow.com/questions/76549262/onvisithighlightedline-cannot-push-classname-using-rehype-pretty-code
            const nodeClass = node.properties.className;

            if (nodeClass && nodeClass.length > 0) {
              node.properties.className.push("line--highlighted");
            } else {
              node.properties.className = ["line--highlighted"];
            }
          },
          onVisitHighlightedWord(node: {
            properties: { className: string[] };
          }) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
