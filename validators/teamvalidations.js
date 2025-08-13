const z = require("zod");

const TeamSchema = z.object({
  teamName: z.string().min(1, "Team name is required"),
  teamLeader: z.string().min(1, "Team leader is required"),
  members: z.array(z.string()).optional(),
  field: z.enum(["Web Development", "Graphic Designing", "Digital Marketing"], {
    errorMap: () => ({ message: "Invalid field selected" })
  })
});

module.exports = { TeamSchema };
