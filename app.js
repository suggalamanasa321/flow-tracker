import express from "express";
const app = express();
app.use(express.json({ limit: "10mb" }));
import transactionRouter from "./src/router/transaction_router.js";
import categoryRouter from "./src/router/category_router.js";

app.use(transactionRouter);
app.use(categoryRouter);

export { app };