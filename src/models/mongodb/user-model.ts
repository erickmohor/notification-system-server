import mongoose, {Schema} from 'mongoose'


export interface IUserSchema {
  id?: string
  name: string
  email: string
  password_hash: string
  role?: 'admin' | 'member'
  created_at?: Date
  updated_at?: Date
}

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password_hash: { type: String },
  role: { type: String, default: 'member' },
},
{
  timestamps: true,
},
)

export const UserModel = (mongoose.models.users || mongoose.model('users', UserSchema))