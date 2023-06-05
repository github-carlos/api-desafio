import { User } from "@domain/entities";
import Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema<User>({
  id: {type: String, required: true, unique: true, index: true},
  username: {type: String, required: true},
  companyId: {type: String, required: true}
});


export const UserMongooseModel = Mongoose.model<User>('User', UserSchema);