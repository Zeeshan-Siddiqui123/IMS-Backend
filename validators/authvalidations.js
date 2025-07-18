const { z } = require('zod');

const registerSchema = z.object({
  bq_id: z.string().min(6, 'BQ ID must be at least 6 characters'),
  name: z.string().min(3, 'Name is too short'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().min(11, 'Phone number must be at least 11 characters'),
  CNIC: z.string().min(13, 'CNIC must be at least 13 characters'),
  course: z.string().min(1, 'Course is required'),
});

module.exports = { registerSchema };