import { Company } from "@domain/entities";
import { Schema, model, SchemaTypes } from "mongoose";

const companySchema = new Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  description: String,
  units: [new Schema({
    id: { type: String, required: true, unique: true, index: true },
    address: { street: String, city: String, state: String, country: String },
    machines: {type: SchemaTypes.ObjectId, ref: 'Machine'}
  })]
});


export const CompanyMongooseModel = model<Company>('Company', companySchema);