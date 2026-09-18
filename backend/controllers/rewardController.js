import Balance from "../models/Balance.js";
import Transaction from "../models/Transaction.js";

const rewards = {
  1: {
    id: 1,
    status: "Most Popular",
    gems: 28,
    ve: 151
  },
  2: {
    id: 2,
    status: "Best Value",
    gems: 39,
    ve: 220
  },
  3: {
    id: 3,
    status: "High Conversion",
    gems: 56,
    ve: 330
  }
};

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

export const convertReward = async (req, res) => {
  try {
    const rewardId = Number(req.body.rewardId);
    const reward = rewards[rewardId];

    if (!reward) {
      return res.status(400).json({
        success: false,
        message: "Invalid reward"
      });
    }

    const balance = await getMainBalance();

    if (balance.gems < reward.gems) {
      return res.status(400).json({
        success: false,
        message: "Insufficient Gems"
      });
    }

    balance.gems -= reward.gems;
    balance.ves += reward.ve;

    await balance.save();

    await Transaction.create({
      type: "REWARD_CONVERSION",
      gemsChange: -reward.gems,
      vesChange: reward.ve,
      gemsBalance: balance.gems,
      vesBalance: balance.ves,
      description: `${reward.gems} Gems converted to ${reward.ve} VEs`
    });

    res.json({
      success: true,
      reward,
      balance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const claimReward = async (req, res) => {
  try {
    const rewardId = Number(req.body.rewardId);
    const reward = rewards[rewardId];

    if (!reward) {
      return res.status(400).json({
        success: false,
        message: "Invalid reward"
      });
    }

    const balance = await getMainBalance();

    balance.ves += reward.ve;

    await balance.save();

    await Transaction.create({
      type: "AD_REWARD",
      gemsChange: 0,
      vesChange: reward.ve,
      gemsBalance: balance.gems,
      vesBalance: balance.ves,
      description: `Ad reward claimed: ${reward.ve} VEs`
    });

    res.json({
      success: true,
      reward,
      balance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getRewards = async (req, res) => {
  try {
    res.json({
      success: true,
      rewards: Object.values(rewards)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};