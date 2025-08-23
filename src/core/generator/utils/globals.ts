import { HlprApiDirectory } from "../helpers/directory";
import { Choices } from "./constants";

export const CheckIfNameIsDirectory = () => ({
  name: 'directory',
  type: 'input',
  message: 'Input Directory Folder',
  when: (answer: any) => {
    return answer.type === Choices.Directory;
  },
})

export const DirectoryType = (component='') => ({
  name: 'type',
  type: 'list',
  choices: Object.values(Choices),
  message: `Please Choose what directory for ${component}`
});

export const DirectoryTypeFor = (component='') => ({
  name: 'type',
  type: 'list',
  choices: Object.values(Choices).filter(f => f !== Choices.Global),
  message: `Please Choose what directory type for ${component}`
});

export function PathDirectory(answers: any, config: any, plop: any, component = '') {
  answers.location = answers.directory || answers.name;
  config.pathDirectory = HlprApiDirectory(answers.location);

  const message = `Path directory is ${answers.type} for ${component}`;

  return message;
}

export function SetYourComponent(answers: any, config: any, plop: any, component = '') {
  answers.component = config.component;
  answers.extension = config.extension || config.component;

  return `Setting Component to ${answers.component}`;
}

export const RunPathDirectory = () => ({
  type: 'pathDirectory',
});

export const RunDirectoryAction = () => ({
  type: 'pathDirectoryForAction',
});

export const RunDirectoryService = () => ({
  type: 'pathDirectoryForService',
});

export const RunDirectoryValidator = () => ({
  type: 'pathDirectoryForValidator',
});

export const RunDirectoryModel = () => ({
  type: 'pathDirectoryForModel',
});

export const RunDirectoryGuard = () => ({
  type: 'pathDirectoryForGuard',
});

export const RunDirectoryPolicy = () => ({
  type: 'pathDirectoryForPolicy',
});

export const RunDirectoryRoute = () => ({
  type: 'pathDirectoryForRoute',
});

export default {
  SetYourComponent,
  CheckIfNameIsDirectory,
  DirectoryType,
  RunPathDirectory,
  RunDirectoryAction,
  RunDirectoryModel,
  RunDirectoryValidator,
  RunDirectoryGuard,
  RunDirectoryPolicy,
  RunDirectoryRoute
}
