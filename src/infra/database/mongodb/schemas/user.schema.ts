import { User } from "@domain/entities";
import Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema<User>({
  username: {type: String, required: true},
  companyId: {type: String, required: true}
});


export const UserMongooseModel = Mongoose.model<User>('User', UserSchema);