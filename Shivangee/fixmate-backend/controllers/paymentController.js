const Razorpay = require("razorpay");
const crypto = require("crypto");
const Job = require("../models/Job"); // ✅ IMPORTANT

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🟢 Create Order
exports.createOrder = async (req, res) => {
  try {
    const { amount, jobId } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating order",
    });
  }
};

// 🟢 Verify Payment
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      jobId // ✅ IMPORTANT
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {

      // ✅ UPDATE JOB PAYMENT
      const job = await Job.findById(jobId);

      if (job) {
        job.isPaid = true;
        job.paymentStatus = "completed";
        await job.save();
      }

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });

    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};

// 💰 Select payment method
exports.selectPaymentMethod = async (req, res) => {
  try {
    const { method } = req.body;

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    job.paymentMethod = method;

    await job.save();

    res.status(200).json({
      success: true,
      message: 'Payment method selected',
      data: job
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Payment method failed',
      error: error.message
    });
  }
};