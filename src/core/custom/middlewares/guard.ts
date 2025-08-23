import { apiPathComponent, DirectoryType } from "../../generator/utils";
import { CheckIfNameIsDirectory, RunDirectoryGuard } from '../../generator/utils/globals';

export const AskDirectoryTypeForGuard = DirectoryType('Guard');
export const guardActions = [
  {
    type: 'setComponent',
    component: 'guard',
  },
  {
    type: 'add',
    path: apiPathComponent,
    templateFile: '{{HlprBaseDirectory }}/smurf-templates/Guard.smurf'
  },
  {
    type: 'modify',
    path: apiPathComponent,
    pattern: /smurfGuard/gi,
    template: '{{GuardChangeName name}}'
  },
];
export const GenerateGuard = {
  description: 'Generator For Creating Guard',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of Guard you want to create.'
    },
    AskDirectoryTypeForGuard,
    CheckIfNameIsDirectory(),
  ],
  actions: [
    RunDirectoryGuard,
    ...guardActions,
  ]
}

export default {
  GenerateGuard,
  AskDirectoryTypeForGuard,
  guardActions
}