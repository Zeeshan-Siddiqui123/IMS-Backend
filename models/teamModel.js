import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: [true, "Team name is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    teamLeader: {
      type: String,
      required: [true, "Team leader name is required"],
      trim: true,
    },
    members: {
      type: [String], 
      default: [],
    },
  },
  { timestamps: true }
);

modules.exports = mongoose.model("team", teamSchema);
