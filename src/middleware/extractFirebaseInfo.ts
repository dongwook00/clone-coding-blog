import logging from "../config/logging";
import firebaseAdmin from "firebase-admin";
import {Request, Response, NextFunction} from "express";

const extractFirebaseInfo = async (req: Request, res: Response, next: NextFunction) => {
  logging.info("Validating firebase token ...");
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const result = await firebaseAdmin.auth().verifyIdToken(token);

  if (!result) {
    logging.warn("Token invalid, unautorized...");
    return res.status(401).json({ message: "unauthorized" });
  }

  res.locals.firebase = result;
  res.locals.fire_token = token;
  next();



}

export default extractFirebaseInfo;