import OpenAI from "openai";

export let openai: OpenAI;

export default function Cors(app: any) {
  openai = new OpenAI({
    baseURL: "http://localhost:11434/v1",
    apiKey: "ollama",
  });
}
