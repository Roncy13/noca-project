import { apiPathComponent, DirectoryType } from "../../generator/utils";
import { CheckIfNameIsDirectory, RunDirectoryService } from './../../generator/utils/globals';

export const AskDirectoryTypeForService = DirectoryType('Services');
export const serviceActions = [
  {
    type: 'setComponent',
    component: 'services',
  },
  {
    type: 'add',
    path: apiPathComponent,
    templateFile: '{{ HlprBaseDirectory }}/smurf-templates/service.smurf'
  },
  {
    type: 'modify',
    path: apiPathComponent,
    pattern: /ModelAllSrv/gi,
    template: '{{ServiceChangeModelAll name}}'
  }
];
export const GenerateService = {
  description: 'Generator For Creating Service',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of Service you want to create.'
    },
    AskDirectoryTypeForService,
    CheckIfNameIsDirectory(),
  ],
  actions: [
    RunDirectoryService,
    ...serviceActions
  ]
}

export default {
  GenerateService,
  AskDirectoryTypeForService,
  serviceActions
}