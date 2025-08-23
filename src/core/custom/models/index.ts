import { apiPathComponent, DirectoryType } from "../../generator/utils";
import { CheckIfNameIsDirectory, RunDirectoryModel } from './../../generator/utils/globals';

export const AskDirectoryTypeForModel = DirectoryType('Model');
export const modelActions = [
  {
    type: 'setComponent',
    component: 'models',
    extension: 'model'
  },
  {
    type: 'add',
    path: apiPathComponent,
    templateFile: '{{HlprBaseDirectory }}/smurf-templates/model.smurf'
  },
  {
    type: 'modify',
    path: apiPathComponent,
    pattern: /ModelName/gi,
    template: '{{ModelChangeName name}}'
  },
];
export const GenerateModel = {
  description: 'Generator For Creating Your Model or Schema',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of Model you want to create.'
    },
    AskDirectoryTypeForModel,
    CheckIfNameIsDirectory(),
  ],
  actions: [
    RunDirectoryModel,
    ...modelActions
  ]
}

export default {
  GenerateModel,
  AskDirectoryTypeForModel,
  modelActions
}