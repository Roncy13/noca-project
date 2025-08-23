import { ISectionContent } from "./documents.types";

export function formatContent(doc: ISectionContent) {
  if (!doc) return;

  const sub = doc.subClause?.length
    ? `\n\n\n\t\t\t<h6>- ${doc.subClause.join("\n- ")}<h6>`
    : "";
  doc.formattedContent = `<h3>${doc.section}</h3>\n\n\t\t<h4>${doc.clause}${sub}</h4>`;
}
