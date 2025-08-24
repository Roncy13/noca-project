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

export const renderClauseHTML = (data: ISectionContent, index: number) => {
  const { section, clause, subClause } = data;

  // Convert subClauses into HTML list items
  const subClauseHTML = subClause
    .map(
      (item) => `<li><p style="margin:0;">${item}</p></li>` // inline style to keep spacing consistent
    )
    .join("");

  // Combine everything into one HTML string
  const htmlString = `
    <div>
      <h3>Section ${index + 1}: ${section}</h3>
      <p>${clause}</p>
      <ul>
        ${subClauseHTML}
      </ul>
    </div>
  `;

  return htmlString;
};
