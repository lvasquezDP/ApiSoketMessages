import mongoose from "mongoose";

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  constructor() {}
  static async connect(op: Options) {
    const { mongoUrl, dbName } = op;
    try {
      await mongoose.connect(mongoUrl, { dbName });
    } catch (error) {
      throw 'mongo not conected';
    }
  }
  static async disconect(){
    await mongoose.disconnect();
  }
}
