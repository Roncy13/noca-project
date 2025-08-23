import { apiPath, CheckIfNameIsDirectory, DirectoryTypeFor, RunDirectoryAction } from "../../generator/utils";

export const AskDirectoryTypeForActions = DirectoryTypeFor('Actions');
export const apiActions = [
  {
    type: 'add',
    path: apiPath,
    templateFile: '{{HlprBaseDirectory }}/smurf-templates/action.smurf'
  },
  {
    type: 'modify',
    path: apiPath,
    pattern: /SmurfApi/i,
    template: '{{ApiChangeIndexApiName name}}'
  },
  {
    type: 'modify',
    path: apiPath,
    pattern: /Smurf Api Data/i,
    template: '{{ApiChangeApiData name}}'
  },
  {
    type: 'modify',
    path: apiPath,
    pattern: /custom-end-point/i,
    template: '{{ApiFileName name}}'
  },
  {
    type: 'modify',
    path: apiPath,
    pattern: /message-action/i,
    template: '{{ChangeMessageAction name}}'
  }
];

export const GenerateAction =  {
  description: 'Generator For Creating API Component.',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of Action you want to create.'
    },
    AskDirectoryTypeForActions,
    CheckIfNameIsDirectory(),
  ],
  actions: [
    RunDirectoryAction(),
    ...apiActions,
  ]
};

export default {
  apiPath,
  apiActions,
  DirectoryTypeForActions: AskDirectoryTypeForActions,
  GenerateAction,
};