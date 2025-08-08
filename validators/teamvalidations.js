const z = require("zod")

const TeamSchema = z.object({
  teamName: z.string().min(1, "Team name is required"),
  teamLeader: z.string().min(1, "Team leader name is required"),
  members: z.array(z.string()).optional(),
});

module.exports = { TeamSchema };