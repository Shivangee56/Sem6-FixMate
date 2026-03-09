const express = require("express");
const router = express.Router();
const Worker = require("../models/Worker");

// POST /api/recommendations
router.post("/", async (req, res) => {
  try {
    const { category, latitude, longitude, maxDistance, minRating, maxBudget } = req.body;

    const workers = await Worker.find({
      isActive: true,
      "availability.isAvailable": true,
      categories: category,
      "rating.average": { $gte: minRating || 0 },
      "pricing.baseRate": { $lte: maxBudget || Infinity },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: maxDistance || 5000, // default 5km
        },
      },
    })
    .sort({ "rating.average": -1 })
    .limit(10);

    res.json({
      success: true,
      count: workers.length,
      workers,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;