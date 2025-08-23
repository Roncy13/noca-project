import { ISectionContent } from "./documents.types";

export function formatContent(doc: ISectionContent) {
  if (!doc) return;

  // Build subclauses as <li> list items
  const sub =
    doc.subClause?.length > 0
      ? `<ul>${doc.subClause.map((s) => `<li>${s}</li>`).join("")}</ul>`
      : "";

  // Wrap everything nicely in headings
  doc.formattedContent = `
    <div class="section-content">
      <h3>${doc.section}</h3>
      <p>${doc.clause}</p>
      ${sub}
    </div>
  `.trim();

  return doc;
}
