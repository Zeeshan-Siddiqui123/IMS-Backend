const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: [true, "Team name is required"],
      unique: true,
      trim: true,
    },
    teamLeader: {
      type: String,
      required: [true, "Team leader name is required"],
      trim: true,
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"user"
    }],

    field : {
      type : String,
      enum : ["Web Dev" , "Graphics" , "Marketing"],
      required : true
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model('team', teamSchema);
