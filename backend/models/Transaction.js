import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
    type: {
      type: String,
      enum: [
        'INITIAL',
        'GEM_EARNED',
        'VE_EARNED',
        'CONVERSION',
        'REWARD_CONVERSION',
        'AD_REWARD',
        'BONUS'
      ],
      required: true
    },
    gemsChange: {
      type: Number,
      default: 0
    },
    vesChange: {
      type: Number,
      default: 0
    },
    gemsBalance: {
      type: Number,
      required: true
    },
    vesBalance: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
) 

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction