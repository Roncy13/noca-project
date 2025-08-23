import { PathDirectory } from "../utils/globals";
import { StrTitleCase } from './../helpers/strings';

export function pathDirectoryForModel(answers: any, config: any, plop: any) {
  return PathDirectory(answers, config, plop, 'Model');
}

export function ModelChangeName(name: string) {
  const title = StrTitleCase(name);

  return `${title}`;
}

export default {
  pathDirectoryForModel,
  ModelChangeName,
}