import { DashCase, StrTitleCase } from './../helpers/strings';

export function ApiChangeApiData(name: string) {
  return `index api for ${StrTitleCase(name)}`;
}

export function ApiChangeIndexApiName(name: string) {
  const title = StrTitleCase(name);

  return `${title}Api`;
}

export function ApiFileName(name: string) {
  return DashCase(name);
}

export function ChangeMessageAction(name: string) {
  const dashCaseName = StrTitleCase(name);
  return `${dashCaseName} fetched successfully`;
}

export default {
  ApiFileName,
  ApiChangeApiData,
  ApiChangeIndexApiName,
  ChangeMessageAction
}