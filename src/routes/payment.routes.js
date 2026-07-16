import express from "express";
import Order from "../models/order.model.js";   // 👈 import your existing Order model

const router = express.Router();

// GET /api/payments – list all payments (from orders)
router.get("/", async (req, res) => {
  try {
    // Fetch orders with only the fields we need
    const orders = await Order.find({}, {
      userEmail: 1,
      total: 1,
      paymentMethod: 1,
      status: 1,
      createdAt: 1,
    }).sort({ createdAt: -1 });

    // Transform into payment-like objects for the admin table
    const payments = orders.map(order => ({
      _id: order._id,
      userEmail: order.userEmail,
      amount: order.total,
      paymentMethod: order.paymentMethod,
      status: order.status,
      createdAt: order.createdAt,
    }));

    res.json({ success: true, payments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

// POST /api/payments/process-payment (you already have this)
router.post("/process-payment", async (req, res) => {
  try {
    const { token, total } = req.body;
    console.log("Payment token:", token);
    console.log("Total amount:", total);
    // Simulate success
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ success: false, error: "Payment failed" });
  }
});

export default router;