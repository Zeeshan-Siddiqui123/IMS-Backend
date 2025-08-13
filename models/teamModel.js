const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: [true, "Team name is required"],
      unique: true,
      trim: true,
    },

    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true
        },
        role: {
          type: String,
          enum: ["Team Leader", "Member"],
          required: true
        }
      }
    ],

    field: {
      type: String,
      enum: ["Web Development", "Graphic Designing", "Digital Marketing"],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("team", teamSchema);
