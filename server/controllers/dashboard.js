const User = require("../Models/user-model");
const Plan = require("../Models/plan");
const moment = require("moment");
const Trainer = require("../Models/trainer-model");

const getMonthlyRevenue = async (req, res) => {
  try {
    const sixMonthsAgo = moment().subtract(5, "months").startOf("month");
    const monthsList = [];

    // Step 1: Create a list of last 6 months (e.g., Mar, Apr, ..., Aug)
    for (let i = 0; i < 6; i++) {
      const month = moment(sixMonthsAgo).add(i, "months");
      monthsList.push({
        label: month.format("MMM"),
        year: month.year(),
        month: month.month() + 1, // moment months are 0-indexed
        revenue: 0,
      });
    }

    // Step 2: Aggregate actual revenue data
    const revenue = await User.aggregate([
      {
        $match: {
          feeStatus: "Paid",
          feePaidDate: { $gte: sixMonthsAgo.toDate() },
        },
      },
      {
        $lookup: {
          from: "plans",
          localField: "membershipPlan",
          foreignField: "_id",
          as: "planInfo",
        },
      },
      { $unwind: "$planInfo" },
      {
        $group: {
          _id: {
            year: { $year: "$feePaidDate" },
            month: { $month: "$feePaidDate" },
          },
          totalRevenue: { $sum: "$planInfo.price" },
        },
      },
    ]);

    // Step 3: Merge real data into monthsList
    revenue.forEach((item) => {
      const match = monthsList.find(
        (m) => m.year === item._id.year && m.month === item._id.month
      );
      if (match) {
        match.revenue = item.totalRevenue;
      }
    });

    // Step 4: Format result for frontend
    const formatted = monthsList.map((m) => ({
      month: m.label,
      revenue: m.revenue,
    }));

    res.status(200).json({ success: true, data: formatted });
  } catch (error) {
    console.error("Error fetching monthly revenue:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



const getMembershipDistribution = async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $match: { role: "user", membershipPlan: { $ne: null } },
      },
      {
        $group: {
          _id: "$membershipPlan",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "plans",
          localField: "_id",
          foreignField: "_id",
          as: "planDetails",
        },
      },
      {
        $unwind: "$planDetails",
      },
      {
        $project: {
          _id: 0,
          plan: "$planDetails.name",
          count: 1,
        },
      },
    ]);

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Membership Distribution Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


const getDashboardStats = async (req, res) => {
  try {
    // 1. Total Members
    const totalMembers = await User.countDocuments({ role: "user" });

    // 2. Expiring in 2 Days
    const today = moment().startOf("day");
    const in2Days = moment().add(2, "days").endOf("day");
    const expiringSoon = await User.countDocuments({
      role: "user",
      planEndDate: { $gte: today.toDate(), $lte: in2Days.toDate() }
    });

    // 3. Total Trainers
    const totalTrainers = await Trainer.countDocuments();

    // 4. Current Month Revenue
    const currentMonthStart = moment().startOf("month").toDate();
    const currentMonthEnd = moment().endOf("month").toDate();
    const currentMonthPayments = await User.find({
      role: "user",
      feeStatus: "Paid",
      feePaidDate: { $gte: currentMonthStart, $lte: currentMonthEnd },
    }).populate("membershipPlan");

   const currentMonthRevenue = currentMonthPayments.reduce((sum, user) => {
  const planPrice = user.membershipPlan?.price || 0;
  return sum + planPrice;
}, 0);

    // 5. Joined This Month
    const joinedThisMonth = await User.countDocuments({
      role: "user",
      createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd },
    });

     // 6. Most Popular Plan
    const planCounts = await User.aggregate([
      { $match: { membershipPlan: { $ne: null } } },
      { $group: { _id: "$membershipPlan", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: "plans",
          localField: "_id",
          foreignField: "_id",
          as: "planDetails"
        }
      },
      { $unwind: "$planDetails" },
      {
        $project: {
          _id: 0,
          name: "$planDetails.name",
          count: 1
        }
      }
    ]);
    const mostPopularPlan = planCounts[0] || { name: "No Data", count: 0 };
    // last 6 months Revenue

    const last6Months = Array.from({ length: 6 }, (_, i) =>
  moment().subtract(i, "months").startOf("month")
).reverse();

const revenueLast6Months = await Promise.all(
  last6Months.map(async (start) => {
    const end = moment(start).endOf("month");

    const payments = await User.find({
      role: "user",
      feeStatus: "Paid", // Make sure it's capitalized correctly
      feePaidDate: { $gte: start.toDate(), $lte: end.toDate() },
    }).populate("membershipPlan");

    const revenue = payments.reduce(
      (sum, user) => sum + (user.membershipPlan?.price || 0),
      0
    );

    return {
      month: start.format("MMMM"),
      revenue,
    };
  })
);

const totalRevenueLast6Months = revenueLast6Months.reduce(
  (total, item) => total + item.revenue,
  0
);


    res.json({
      success: true,
      data: {
        totalMembers,
        expiringSoon,
        totalTrainers,
        currentMonthRevenue,
        joinedThisMonth,
        mostPopularPlan,
        totalRevenueLast6Months,
      }
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const trainersData = async (req, res) => {
  try {
    const trainers = await Trainer.find().populate("assignedMembers", "_id");
    
    const result = trainers.map(trainer => ({
      name: trainer.name,
      memberCount: trainer.assignedMembers.length,
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error("Error getting trainer load", err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { getMonthlyRevenue,getMembershipDistribution,getDashboardStats,trainersData };
