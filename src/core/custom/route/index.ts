import { apiPathComponent, DirectoryTypeFor } from "../../generator/utils";
import { CheckIfNameIsDirectory, RunDirectoryRoute } from './../../generator/utils/globals';

export const AskDirectoryTypeForRoute = DirectoryTypeFor('Route');
export const routeActions = [
  {
    type: 'setComponent',
    component: 'route',
    extension: 'routes'
  },
  {
    type: 'add',
    path: apiPathComponent,
    templateFile: '{{HlprBaseDirectory }}/smurf-templates/route.smurf'
  },
  {
    type: 'modify',
    path: apiPathComponent,
    pattern: /smurf/gi,
    template: '{{RouteChangeSmurfActions name}}'
  },
];
export const GenerateRoute = {
  description: 'Generator For Creating Route',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of Route you want to create.'
    },
    AskDirectoryTypeForRoute,
    CheckIfNameIsDirectory(),
  ],
  actions: [
    RunDirectoryRoute,
    ...routeActions
  ]
}

export default {
  GenerateRoute,
  AskDirectoryTypeForRoute,
  routeActions
}