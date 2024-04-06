import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export class Encrypt {
  static async encryptPassword(password : string) {
    return await bcrypt.hash(password,10);
  }
  static async comparePassword(password : string, hashPassword : string) {
    return await bcrypt.compare(password,hashPassword)
  }

  static async generateToken(payload : object) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  }
}