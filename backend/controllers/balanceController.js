import Balance from "../models/Balance.js";
import Transaction from "../models/Transaction.js";

const getMainBalance = async () => {
  return Balance.findOneAndUpdate(
    { key: "main" },
    {
      $setOnInsert: {
        gems: 0,
        ves: 0
      }
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    }
  );
};

export const getBalance = async (req, res) => {
  try {
    const balance = await getMainBalance();

    res.json({
      success: true,
      balance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const addGems = async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0"
      });
    }

    const balance = await getMainBalance();

    balance.gems += amount;

    await balance.save();

    await Transaction.create({
      type: "GEM_EARNED",
      gemsChange: amount,
      vesChange: 0,
      gemsBalance: balance.gems,
      vesBalance: balance.ves,
      description: `${amount} Gems added`
    });

    res.json({
      success: true,
      balance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const addVEs = async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0"
      });
    }

    const balance = await getMainBalance();

    balance.ves += amount;

    await balance.save();

    await Transaction.create({
      type: "VE_EARNED",
      gemsChange: 0,
      vesChange: amount,
      gemsBalance: balance.gems,
      vesBalance: balance.ves,
      description: `${amount} VEs added`
    });

    res.json({
      success: true,
      balance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};