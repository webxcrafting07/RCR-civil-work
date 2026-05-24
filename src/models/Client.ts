import mongoose from 'mongoose'

export interface IClient {
  _id?: string
  name: string
  logo: string
  website?: string
  order: number
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true }, // Image URL
  website: { type: String },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

const Client = mongoose.models.Client || mongoose.model('Client', ClientSchema)
export default Client
