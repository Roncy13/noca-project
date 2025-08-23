import Cors from "./app-settings/cors";
import { IAppUseSettings } from "./../core/use.settings";
import openai from "./app-settings/openai";

export default [
  {
    name: "Cors Setup",
    use: Cors,
  },
  {
    name: "Open Ai",
    use: openai,
  },
] as IAppUseSettings[];
