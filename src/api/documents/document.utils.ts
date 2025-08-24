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

export const renderClauseHTML = (
  data: ISectionContent,
  index: number,
  font: string
) => {
  const { section, clause, subClause } = data;

  // Convert subClauses into HTML list items
  const subClauseHTML = subClause
    .map(
      (item) =>
        `<li><p style="margin:0; line-height:1.5; text-align:justify;">${item}</p></li>`
    )
    .join("");

  // Wrap everything with font + line spacing + justification
  const htmlString = `
    <div style="font-family: ${font}, sans-serif; line-height: 1.5; text-align: justify;">
      <h3 style="margin-bottom: 8px;">Section ${index + 1}: ${section}</h3>
      <p style="margin-bottom: 8px;">${clause}</p>
      <ul style="padding-left: 20px; margin: 0;">
        ${subClauseHTML}
      </ul>
    </div>
  `;

  return htmlString;
};

export const generateLogo = (
  logoBase64: string,
  altText: string = "Company Logo"
) => `
  <div style="text-align: center; margin-bottom: 10px;">
    <img 
      src="${logoBase64}" 
      alt="${altText}" 
      style="max-width: 200px; height: auto;" 
    />
  </div>
`;
