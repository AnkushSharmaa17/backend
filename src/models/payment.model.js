import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String },       // e.g., "Credit/Debit Card", "Cash on Delivery", "UPI QR", "Google Pay"
  status: { type: String, default: 'Pending', enum: ['Pending', 'Completed', 'Failed'] },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },  // link to order
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);