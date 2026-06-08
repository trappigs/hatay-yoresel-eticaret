/**
 * Renders a JSON-LD <script>. The data is application-controlled (never user
 * input), so serializing it here is safe.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
