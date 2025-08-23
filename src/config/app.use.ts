import Cors from './app-settings/cors';
import { IAppUseSettings } from './../core/use.settings';
import SwaggerFn from './app-settings/swagger/index';
import Waiters from './app-settings/Waiters';

export default [
  {
    name: 'Cors Setup',
    use: Cors
  },
  {
    name: 'Swagger Api',
    use: SwaggerFn
  },
  {
    name: 'Waiters',
    use: Waiters
  }
] as IAppUseSettings[];