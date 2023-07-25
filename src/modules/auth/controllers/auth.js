import bcrypt from "bcryptjs";

import userModel from "../../../../DB/models/user.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const signup = asyncHandler(async (req, res, next) => {
  // try {
    const {
      firstName,
      lastName,
      userName,
      password,
      email,
      cPassword,
      age,
      gender,
      phone,
    } = req.body;
    if (password != cPassword) {
      return res.json({ message: "Password Mismatch cPassword" });
      // return next(new Error("Password Mismatch"));
    }
    if (!["male", "female"].includes(gender)) {
      return res.json({ message: "gender must be either male or female" });
    }
    const checkMail = await userModel.findOne({ email });
    if (checkMail) return res.json({ message: "Email must be unique" });
    const checkPhone = await userModel.findOne({ phone });
    if (checkPhone) return res.json({ message: "Phone must be unique" });
    const checkUserName = await userModel.findOne({ userName });
    if (checkUserName) return res.json({ message: "User-name must be unique" });
    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));

    const user = await userModel.create({
      firstName,
      lastName,
      userName,
      password: hashPassword,
      email,
      age,
      gender,
      phone,
    });
    return res.json({ message: "Done", user });
  // } catch (error) {
  //   return res.json({ message: "Catch error", error });
  // }
});
export const login = async (req, res, next) => {
  try {
    const { userName, password, email, phone } = req.body;
    const user = await userModel.findOne({
      $or: [{ email }, { userName }, { phone }]
    });
    if (!user) {
      return res.json({ message: "Email not exist" });
    }
    const match = bcrypt.compareSync(password, user.password);
    if(!match){
      return res.json({ message: "Please enter valid credentials" });
    }
    return res.json({
      message: `Hi ${user.firstName} ${user.lastName}`
    });
  } catch (error) {
    return res.json({ message: "Catch error" });
  }
};
