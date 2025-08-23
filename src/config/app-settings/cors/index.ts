import cors from 'cors';

const defaultCors = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};
export default function Cors(app: any) {
  app.use(cors(defaultCors));
}