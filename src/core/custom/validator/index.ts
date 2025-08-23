import { apiPathComponent, DirectoryType } from "../../generator/utils";
import { CheckIfNameIsDirectory, RunDirectoryValidator } from './../../generator/utils/globals';

export const AskDirectoryTypeForValidator = DirectoryType('Validator');
export const validatorActions = [
  {
    type: 'setComponent',
    component: 'validators',
  },
  {
    type: 'add',
    path: apiPathComponent,
    templateFile: '{{ HlprBaseDirectory }}/smurf-templates/validator.smurf'
  },
  {
    type: 'modify',
    path: apiPathComponent,
    pattern: /ValidatorSchema/gi,
    template: '{{ValidatorChangeName name}}'
  }
];
export const GenerateValidator = {
  description: 'Generator For Creating Validator',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of Validator you want to create.'
    },
    AskDirectoryTypeForValidator,
    CheckIfNameIsDirectory(),
  ],
  actions: [
    RunDirectoryValidator,
    ...validatorActions
  ]
}

export default {
  GenerateValidator,
  AskDirectoryTypeForValidator,
  validatorActions
}