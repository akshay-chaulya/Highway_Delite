import { connect } from "mongoose";
import { dbUri } from "../config";

export const dbConnection = (fn: () => void) => {
  connect(dbUri)
    .then(() => {
      console.log("Database connected successfully.");
      fn();
    })
    .catch(() => {
        console.error("Database connection failed. Exiting now...");
        process.exit(1);
    });
};
