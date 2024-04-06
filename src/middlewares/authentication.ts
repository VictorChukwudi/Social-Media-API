import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (typeof authHeader !== "undefined") {
        const token = authHeader.split(" ")[1];
    
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
          if (err) {
            res.status(400).json({
              status: "Error",
              msg: "Session Expired. Signin again." || err.message,
            });
          } else {
            req["user"]=user
            next();
          }
        });
      } else {
        res.status(403).json({
          status: "Error",
          msg: "Unauthorized. Login or signup to view this resource",
        });
      }
}