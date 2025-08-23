import { PathDirectory } from "../utils/globals";
import { StrTitleCase } from './../helpers/strings';

export function pathDirectoryForService(answers: any, config: any, plop: any) {
  return PathDirectory(answers, config, plop, 'Service');
}

export function ServiceChangeModelAll(name: string) {
  const title = StrTitleCase(name);

  return `${title}AllSrv`;
}

export default {
  pathDirectoryForService,
  ServiceChangeModelAll,
}