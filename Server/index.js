const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use(cors({
  origin: [process.env.CLIENT_URL, 'http://localhost:5173'], // ✅ Allow both deployed and local frontend
  credentials: true
}));

app.use(express.json());

// Mongoose Schema and Model
const transactionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Financio API is running with MongoDB Atlas!" });
});

app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching transactions' });
  }
});

app.get("/api/transactions/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction) {
      res.json({ success: true, data: transaction });
    } else {
      res.status(404).json({ success: false, message: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching transaction' });
  }
});

app.post("/api/transactions", async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.status(201).json({ success: true, data: newTransaction });
  } catch (error) {
    console.error('❌ Error saving transaction:', error);
    res.status(500).json({ success: false, message: 'Failed to save transaction' });
  }
});

app.put("/api/transactions/:id", async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    if (updatedTransaction) {
      res.json({ success: true, message: "Transaction updated successfully", data: updatedTransaction });
    } else {
      res.status(404).json({ success: false, message: "Transaction not found" });
    }
  } catch (error) {
    console.error('❌ Error updating transaction:', error);
    res.status(500).json({ success: false, message: 'Failed to update transaction' });
  }
});

app.delete("/api/transactions/:id", async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);

    if (deletedTransaction) {
      res.json({ success: true, message: "Transaction deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Transaction not found" });
    }
  } catch (error) {
    console.error('❌ Error deleting transaction:', error);
    res.status(500).json({ success: false, message: 'Failed to delete transaction' });
  }
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Finance Tracker server is running on port ${PORT}`);
});
