const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

const instance = new Razorpay({
  key_id: 'rzp_test_Y2YRN2hxbkwWvF',
  key_secret: 'Hn98Amml3GNPLdgfdAeEtSpV',
});

router.post('/create/orderId', (req, res) => {
  const options = {
    amount: req.body.amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  instance.orders.create(options, (err, order) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(order);
  });
});

router.post('/api/payment/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.response;
  const secret = 'Hn98Amml3GNPLdgfdAeEtSpV';
  const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');
  
  try {
    const result = validatePaymentVerification(
      { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
      razorpay_signature,
      secret
    );
    res.json({ status: "success", valid: result });
  } catch (error) {
    res.json({ status: "failure", error: error.message });
  }
});



module.exports = router;
