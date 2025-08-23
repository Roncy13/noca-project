import { PathDirectory } from "../utils/globals";

export function pathDirectoryForAction(answers: any, config: any, plop: any) {
  return PathDirectory(answers, config, plop, 'Action');
}

export default {
  pathDirectoryForAction,
}