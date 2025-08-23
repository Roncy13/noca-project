import { PathDirectory } from "../utils/globals";
import { StrTitleCase } from './../helpers/strings';

export function pathDirectoryForValidator(answers: any, config: any, plop: any) {
  return PathDirectory(answers, config, plop, 'Validator');
}

export function ValidatorChangeName(name: string) {
  const title = StrTitleCase(name);

  return `${title}Schema`;
}

export default {
  pathDirectoryForValidator,
  ValidatorChangeName,
}