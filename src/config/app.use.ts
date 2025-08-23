import Cors from "./app-settings/cors";
import { IAppUseSettings } from "./../core/use.settings";
import openai from "./app-settings/openai";
import MongoDB from "./app-settings/mongodb";

export default [
  {
    name: "MongoDB",
    use: MongoDB,
  },
  {
    name: "Cors Setup",
    use: Cors,
  },
  {
    name: "Open Ai",
    use: openai,
  },
] as IAppUseSettings[];
