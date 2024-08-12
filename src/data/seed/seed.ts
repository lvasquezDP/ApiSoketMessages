import { envs } from "../../config";
import { CategoryModel } from "../mongo/models/category.model";
import { MessageModel } from "../mongo/models/messages.model";
import { ProductModel } from "../mongo/models/product.model";
import { UserModel } from "../mongo/models/user.model";
import { MongoDatabase } from "../mongo/mongo.data";
import { seedData } from "./data";

(async () => {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });
  await main();
  await MongoDatabase.disconect();
})();

const random = (x: number) => {
  return Math.floor(Math.random() * x);
};

async function main() {
  await Promise.all([
    UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany(),
    MessageModel.deleteMany(),
  ]);

  const users = await UserModel.insertMany(seedData.users);

  const categories = await CategoryModel.insertMany(
    seedData.categories.map((c) => ({ ...c, user: users[random(users.length-1)]._id }))
  );
  
  const products = await ProductModel.insertMany(
    seedData.products.map((p) => ({
      ...p,
      user: users[random(users.length-1)]._id,
      category: categories[random(categories.length-1)]._id,
    }))
  );

  console.log("SEEDED");
}
