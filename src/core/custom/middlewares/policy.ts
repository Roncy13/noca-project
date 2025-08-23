import { apiPathComponent, DirectoryType } from "../../generator/utils";
import { CheckIfNameIsDirectory, RunDirectoryPolicy } from './../../generator/utils/globals';

export const AskDirectoryTypeForPolicy = DirectoryType('Policy');
export const policyActions = [
  {
    type: 'setComponent',
    component: 'policy',
  },
  {
    type: 'add',
    path: apiPathComponent,
    templateFile: '{{HlprBaseDirectory }}/smurf-templates/Policy.smurf'
  },
  {
    type: 'modify',
    path: apiPathComponent,
    pattern: /smurfPolicy/gi,
    template: '{{PolicyChangeName name}}'
  }
];
export const GeneratePolicy = {
  description: 'Generator For Creating Policy',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of Policy you want to create.'
    },
    AskDirectoryTypeForPolicy,
    CheckIfNameIsDirectory(),
  ],
  actions: [
    RunDirectoryPolicy,
    ...policyActions
  ]
}

export default {
  GeneratePolicy,
  AskDirectoryTypeForPolicy,
  policyActions
}