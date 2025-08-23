import { ISectionContent } from "./documents.types";

export function formatContent(doc: ISectionContent) {
  if (!doc) return;

  const sub = doc.subClause?.length ? `\n- ${doc.subClause.join("\n- ")}` : "";
  doc.formattedContent = `${doc.section}\n${doc.clause}${sub}`;
}
