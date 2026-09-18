import Balance from "../models/Balance.js";
import Transaction from "../models/Transaction.js";

const GEM_TO_VE = 5.39;
const MIN_GEMS = 20;
const MIN_VES = MIN_GEMS * GEM_TO_VE;

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

const roundAmount = (amount) => {
  return Number(amount.toFixed(2));
};

export const convertGemsToVEs = async (req, res) => {
  try {
    const amount = Number(req.body.gems);

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid Gems amount"
      });
    }

    if (amount < MIN_GEMS) {
      return res.status(400).json({
        success: false,
        message: `Minimum conversion is ${MIN_GEMS} Gems`
      });
    }

    const balance = await getMainBalance();

    if (amount > balance.gems) {
      return res.status(400).json({
        success: false,
        message: "Insufficient Gems"
      });
    }

    const vesReceived = roundAmount(amount * GEM_TO_VE);

    balance.gems = roundAmount(balance.gems - amount);
    balance.ves = roundAmount(balance.ves + vesReceived);

    await balance.save();

    await Transaction.create({
      type: "CONVERSION",
      gemsChange: -amount,
      vesChange: vesReceived,
      gemsBalance: balance.gems,
      vesBalance: balance.ves,
      description: `${amount} Gems converted to ${vesReceived} VEs`
    });

    res.json({
      success: true,
      conversion: {
        gemsUsed: amount,
        vesReceived
      },
      balance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const convertVEsToGems = async (req, res) => {
  try {
    const amount = Number(req.body.ves);

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid VEs amount"
      });
    }

    if (amount < MIN_VES) {
      return res.status(400).json({
        success: false,
        message: `Minimum conversion is ${MIN_VES.toFixed(2)} VEs`
      });
    }

    const balance = await getMainBalance();

    if (amount > balance.ves) {
      return res.status(400).json({
        success: false,
        message: "Insufficient VEs"
      });
    }

    const gemsReceived = roundAmount(amount / GEM_TO_VE);

    balance.ves = roundAmount(balance.ves - amount);
    balance.gems = roundAmount(balance.gems + gemsReceived);

    await balance.save();

    await Transaction.create({
      type: "CONVERSION",
      gemsChange: gemsReceived,
      vesChange: -amount,
      gemsBalance: balance.gems,
      vesBalance: balance.ves,
      description: `${amount} VEs converted to ${gemsReceived} Gems`
    });

    res.json({
      success: true,
      conversion: {
        vesUsed: amount,
        gemsReceived
      },
      balance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};