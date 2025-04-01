import z from "zod";

export const userRegistrationSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(2, "Name must be at least 2 characters"),
  avatar: z.string().optional(),
  email: z.string({ required_error: "Email is required" }).email("Not a valid email"),
  phone: z.string().optional(),
});

export const userUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  avatar: z.string().optional(),
  email: z.string().email("Not a valid email").optional(),
  phone: z.string().optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update",
});