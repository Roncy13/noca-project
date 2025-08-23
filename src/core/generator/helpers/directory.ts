import { isObject } from "lodash";
import { Choices } from "../utils";
import { DashCase } from "./strings";

export function HlprApiDirectory(name: string) {
  const basePath = HlprBaseDirectory();
  const splitName = name.split('/');
  const dirName = splitName.pop();
  const dashCase = DashCase(dirName);
  const directory = [...splitName, dashCase];
  const result = `${basePath}/src/api/${directory.join('/')}`;

  return result;
}

export function HlprBaseDirectory(folder: object | string ='') {
  if (isObject(folder)) {
    return '../../..'
  }
  return `../../..${folder}`
}

export function HlprCheckDirectory(component= '', type = Choices.Global, name='', directory = '') {
  if (type === Choices.Global) {
    return `../../../src/${component}`
  }

  return HlprApiDirectory(type === Choices.Default ? name : directory);
}

export default {
  HlprApiDirectory,
  HlprBaseDirectory,
  HlprCheckDirectory,
}