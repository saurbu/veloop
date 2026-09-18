import mongoose from "mongoose";

const balanceSchema = new mongoose.Schema(
    {
      key: {
        type: String,
        unique: true,
        default: "main"
      },
      gems: {
        type: Number,
        default: 100,
        min: 0
      },
      ves: {
        type: Number,
        default: 100,
        min: 0
      }
    },
    {
        timestamps: true
    }
)

const Balance = mongoose.model("balance", balanceSchema)

export default Balance