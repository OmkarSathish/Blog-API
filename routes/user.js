import { Router } from "express";

import {
  zodLoginValidation,
  zodRegisterValidation,
  zodUpdateInfoValidation,
} from "../middlewares/validations/user.js";
import {
  getAllUsersHandler,
  getUserHandler,
  handleUserLogin,
  handleUserLogout,
  handleUserRegister,
  handleUserRemoval,
  handleUserUpdate,
} from "../controllers/user.js";
import verifyCookie from "../middlewares/verifyCookie.js";

const router = Router();

router.post("/register", zodRegisterValidation, handleUserRegister);

router.post("/login", zodLoginValidation, handleUserLogin);

router.get("/all", verifyCookie, getAllUsersHandler);

router.get("/:id", verifyCookie, getUserHandler);

router.put(
  "/update-profile",
  verifyCookie,
  zodUpdateInfoValidation,
  handleUserUpdate
);

router.delete("/delete-profile", verifyCookie, handleUserRemoval);

router.post("/logout", verifyCookie, handleUserLogout);

export default router;
