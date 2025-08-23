import { PathDirectory } from "../utils/globals";

export function pathDirectoryForRoute(answers: any, config: any, plop: any) {
  return PathDirectory(answers, config, plop, 'Route');
}

export function RouteChangeSmurfActions(name: string) {
  return `${name}`;
}

export default {
  pathDirectoryForRoute,
  RouteChangeSmurfActions,
}