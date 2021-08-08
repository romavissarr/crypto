import connectMongo from "./connectMongo";

export default class mongo {
  public async init() {
    await connectMongo().then(async (mongoose) => {
      try {
        console.log("Connected to MongoDB Compass!");
      } finally {
        mongoose.connection.close();
      }
    });
  }
}
