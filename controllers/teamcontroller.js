const Team = require('../models/teamModel')
const User = require("../models/userModel")
TeamController = {}

TeamController.teamGet = async (req , res) => {
  try {
    // const teams = await Team.find()
    const teams = await Team.find().populate("members", "name")
    res.json(teams)
  } catch (error) {
    res.status(500).json({ message: 'Error Fetching Teams', error })
  }
}

TeamController.createteamPost = async (req, res) => {
    try {
      const { teamName, teamLeader, members } = req.validatedData;
      const { field } = req.body;
  
      const existingTeam = await Team.findOne({ teamName });
      if (existingTeam) {
        return res.status(400).json({
          field: "teamName",
          message: "This name is already taken, please try another"
        });
      }
  
      let membersList = Array.isArray(members) ? members : (members ? [members] : []);
      let members_id = [];
  
      for (const memberName of membersList) {
        const user = await User.findOne({ name: memberName });
        if (user) members_id.push(user._id);
      }

    //   Leader_id
  
      await Team.create({
        teamName,
        teamLeader,
        members: members_id,
        field
      });
  
      return res.status(200).json({ message: "Team created successfully" });
    } catch (error) {
      console.error("Error creating Team:", error);
      return res.status(500).json({ message: "Server Error" });
    }
  };
  


module.exports = {TeamController}
