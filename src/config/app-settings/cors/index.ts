import cors from "cors";

export default function Cors(app: any) {
  console.log("cors");
  app.use(cors());
}
