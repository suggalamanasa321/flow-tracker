import { Router } from "express";
import {
  deleteTransaction,
  getAllTransactions,
  getTransaction,
  getTransactionSummary,
  postTransaction,
  updateTransaction,
} from "../controllers/transaction_controller.js";
const router = Router();

router.route("/transactions").post(postTransaction);
router.route("/transactions").get(getAllTransactions);
router.route("/transactions/:id").get(getTransaction);
router.route("/transactions/:id").put(updateTransaction);
router.route("/transactions/:id").delete(deleteTransaction);
router.route("/summary").get(getTransactionSummary);

export default router;