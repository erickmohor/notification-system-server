import mongoose, {Schema} from 'mongoose'


export interface IMessageSchema {
  userId: string,
  channel: string,
  date: Date,
  isSeen?: boolean,
  origin?: string,
  notification?: {
    webPush?: {
      audience?: string,
      title?: string,
      message?: string,
      icon?: string,
      url?: string,
    },
    sms?: {
      phones?: string[],
      message?: string,
    },
    email?: {
      recipientEmails?: string[],
      template?: string,
    },
  },
  created_at: Date
  updated_at: Date
}

export interface IMessageUncheckedSchema {
  userId?: string,
  channel?: string,
  date?: Date,
  isSeen?: boolean,
  origin?: string,
  notification?: {
    webPush?: {
      audience?: string,
      title?: string,
      message?: string,
      icon?: string,
      url?: string,
    },
    sms?: {
      phones?: string[],
      message?: string,
    },
    email?: {
      recipientEmails?: string[],
      template?: string,
    },
  },
  created_at?: Date
  updated_at?: Date
}

const MessageSchema = new Schema({
  userId: { type: String },
  channel: { type: String },
  date: { type: Date },
  isSeen: { type: Boolean, default: false },
  origin: { type: String },
  notification: {
    webPush: {
      audience: { type: String, default: '' },
      title: { type: String, default: '' },
      message: { type: String, default: '' },
      icon: { type: String, default: '' },
      url: { type: String, default: '' },
    },
    sms: {
      phones: [ { type: String } ],
      message: { type: String, default: '' },
    },
    email: {
      recipientEmails: [ { type: String } ],
      template: { type: String, default: '' },
    },
  },
},
{
  timestamps: true,
},
)

export const MessageModel = (mongoose.models.message || mongoose.model('message', MessageSchema))