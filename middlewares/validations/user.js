import { z } from "zod";

const registerInfoSchema = z.object({
  username: z.string().max(64),
  password: z.string().min(6).max(32),
  email: z.string().email(),
});

export const zodRegisterValidation = (req, res, next) => {
  try {
    const { error } = registerInfoSchema.safeParse(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginInfoSchema = z.object({
  password: z.string().min(6).max(32),
  email: z.string().email(),
});

export const zodLoginValidation = (req, res, next) => {
  try {
    const { error } = loginInfoSchema.safeParse(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateInfoSchema = z.object({
  username: z.string().max(64).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).max(32).optional(),
});

export const zodUpdateInfoValidation = (req, res, next) => {
  try {
    const { error } = updateInfoSchema.safeParse(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
