import dotenv from "dotenv";

import { app } from "./app.js";
import connectDB from "./src/db/index.js";

dotenv.config({ path: "./.env.local" });

connectDB()
  .then(() => {
    app.listen( 5000,'127.0.0.1', () => {
      console.log(`server is running at http://localhost:5000`);
    });
  })
  .catch((error) => {
    console.log("mongodb connection error:", error);
  });