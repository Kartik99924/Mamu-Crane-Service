/**
 * Renders a JSON-LD document. Kept server-rendered so structured data is in the
 * initial HTML rather than injected after hydration.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Schema objects are built in lib/schema.ts from our own constants only.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
