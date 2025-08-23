import { startCase, toLower, camelCase, kebabCase } from 'lodash';

export function StrTitleCase(text: string) {
  return startCase(toLower(text)).replace(/ /gi, '');
}

export function CamelCase(text: string) {
  return camelCase(text);
}

export function DashCase(text: string) {
  return kebabCase(text);
}

export default {
  StrTitleCase
}