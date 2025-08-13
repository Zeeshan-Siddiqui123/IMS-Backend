const Team = require('../models/teamModel');
const User = require("../models/userModel");

const TeamController = {};

// ✅ Get Teams
TeamController.teamGet = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate("members.user", "name");
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error Fetching Teams', error });
  }
};

// ✅ Create Team
TeamController.createteamPost = async (req, res) => {
  try {
    const { teamName, teamLeader, members, field } = req.validatedData;

    // Check if team name already exists
    const existingTeam = await Team.findOne({ teamName });
    if (existingTeam) {
      return res.status(400).json({
        field: "teamName",
        message: "This name is already taken, please try another",
      });
    }

    // Check if team leader exists
    const leaderDoc = await User.findById(teamLeader);
    if (!leaderDoc) {
      return res.status(400).json({
        field: "teamLeader",
        message: "Invalid team leader ID",
      });
    }

    // Validate members
    let members_id = Array.isArray(members) ? members : [];
    const validMembers = await User.find({ _id: { $in: members_id } });
    members_id = validMembers.map((user) => user._id);

    // Create team
    await Team.create({
      teamName,
      teamLeader,
      members: members_id,
      field,
    });

    return res.status(200).json({ message: "Team created successfully" });
  } catch (error) {
    console.error("Error creating Team:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};


// ✅ Update Team
TeamController.updateteam = async (req, res) => {
  try {
    const { id } = req.params;
    const { teamName, members, field } = req.body;

    const leaderCount = members.filter(m => m.role === "Team Leader").length;
    if (leaderCount !== 1) {
      return res.status(400).json({ message: "There must be exactly one Team Leader" });
    }

    const userIds = members.map(m => m.user);
    const validUsers = await User.find({ _id: { $in: userIds } });
    if (validUsers.length !== userIds.length) {
      return res.status(400).json({ message: "Invalid user IDs in members" });
    }

    await Team.findByIdAndUpdate(id, { teamName, members, field }, { new: true });
    res.status(200).json({ message: "Team updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Team
TeamController.deleteteam = async (req, res) => {
  try {
    const { id } = req.params;
    await Team.findByIdAndDelete(id);
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { TeamController };
