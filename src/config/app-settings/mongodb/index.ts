import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

export default async function MongoDB() {
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    dbName: "testdb", // you can choose any db name
  });
}
