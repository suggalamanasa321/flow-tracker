import { Category } from "../models/category_model.js";
import { Transaction } from "../models/transaction_model.js";

export const postTransaction = async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    console.log(category);
    if (!category) {
      return res.status(400).send({ message: "Invalid category" });
    }
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(200).send(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Invalid Transaction Data" });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).send(transactions);
  } catch (error) {
    console.log("Error Fetching Transactions", error);
    res.status(500).send({ message: "failed to fetch Transactions" });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      res.status(404).send({ message: "Transaction not found in database" });
    }
    res.status(200).send(transaction);
  } catch (error) {
    console.log("error while fetching given Transaction", error);
    res.status(500).send({ message: "failed to fetch the given Transaction" });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedTransaction) {
      res.status(404).send({ message: "transaction not found in database" });
    }
    res.status(200).send(updatedTransaction);
  } catch (error) {
    console.log("error while updating transaction", error);
    res.status(500).send({ message: "failed to update the given transaction" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      res.status(404).send({ message: "Transaction not found in database" });
    }

    res.status(200).send({
      message: "Transaction deleted successfully",
      deletedTransaction,
    });
  } catch (error) {
    console.log("error while deleting Transaction", error);
    res.status(500).send({ message: "failed to delete the given Transaction" });
  }
};

export const getTransactionSummary = async (req, res) => {
  try {
    const { start, end, category } = req.query;
    const matchingQuery = {};
    if (start || end) {
      matchingQuery.date = {};
      if (start) {
        matchingQuery.date.$gte = new Date(start);
      }
      if (end) {
        matchingQuery.date.$lte = new Date(end);
      }
    }

    if (category) {
      const newCategory = await Category.findOne({ name: category });
      matchingQuery.category = newCategory._id;
    }
    const transactions = await Transaction.aggregate([
      {
        $match: matchingQuery,
      },
      {
        $group: {
          _id: "$type",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const totalIncome =
      transactions.find((item) => item._id === "income")?.totalAmount || 0;
    const totalExpense =
      transactions.find((item) => item._id === "expense")?.totalAmount || 0;
    const balance = totalIncome - totalExpense;
    res.status(200).send({ totalIncome, totalExpense, balance });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "failed to fetch the transaction summary" });
  }
};