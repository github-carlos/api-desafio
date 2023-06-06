import { Machine, MachineStatusEnum } from "@domain/entities";
import { Schema, model } from "mongoose";

const machineSchema = new Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  image: String,
  description: String,
  model: { name: String, description: String },
  status: { type: String, enum: MachineStatusEnum, default: MachineStatusEnum.Stopped },
  health: { type: Number, default: 100 }
})

export const MachineMongooseModel = model<Machine>('Machine', machineSchema);