import {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";
import logging from "../config/logging";
import User from "../models/user";

const validate = (req: Request, res: Response, next: NextFunction) => {
  logging.info("Token validated, returning user ...");
  let firebase = res.locals.firebase;
  return User.findOne({ uid: firebase.uid })
    .then(user => {
      if (user) {
        return res.status(200).json({ user });
      } else {
        return res.status(401).json({ message: "user not found" });
      }
    })
    .catch(error => {
      logging.error(error);
      return res.status(500).json({ error });
    })
}
