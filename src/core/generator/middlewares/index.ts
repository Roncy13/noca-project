import { PathDirectory } from "../utils/globals";
import { StrTitleCase } from './../helpers/strings';

export function pathDirectoryForPolicy(answers: any, config: any, plop: any) {
  return PathDirectory(answers, config, plop, 'Policy');
}

export function pathDirectoryForGuard(answers: any, config: any, plop: any) {
  return PathDirectory(answers, config, plop, 'Guard');
}

export function GuardChangeName(name: string) {
  const title = StrTitleCase(name);

  return `${title}Guard`;
}

export function PolicyChangeName(name: string) {
  const title = StrTitleCase(name);

  return `${title}Policy`;
}

export default {
  pathDirectoryForPolicy,
  pathDirectoryForGuard,
  GuardChangeName,
  PolicyChangeName
}