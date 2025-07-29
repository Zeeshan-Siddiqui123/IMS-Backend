import { z } from "zod";

export const teamSchema = z.object({
  teamName: z.string().min(1, "Team name is required"),
  description: z.string().optional(),
  teamLeader: z.string().min(1, "Team leader name is required"),
  members: z.array(z.string()).optional(),
});
