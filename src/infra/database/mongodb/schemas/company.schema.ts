import { Company } from "@domain/entities";
import { Schema, model, SchemaTypes } from "mongoose";

const companySchema = new Schema({
  name: { type: String, required: true },
  description: String,
  units: [new Schema({
    address: { street: String, city: String, state: String, country: String },
    machines: [{type: SchemaTypes.ObjectId, ref: 'Machine' }]
  })]
});


export const CompanyMongooseModel = model<Company>('Company', companySchema);