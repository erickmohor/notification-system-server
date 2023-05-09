import mongoose, {Schema} from 'mongoose'


export interface IConfigurationSchema {
  userId: string,
  application: {
    name: string,
    channels: {
      email: boolean,
      sms: boolean,
      webpush: boolean,
    },
  },
  webPush: {
    website: {
      name: string,
      url: string,
      imageUrl: string,
    },
    permissionMessage: {
      msg: string,
      allowButtonText: string,
      denyButtonText: string,
    },
    welcome: {
      title: string,
      msg: string,
      enableUrl: boolean,
      url: string,
    },
  },
  email: {
    server: {
      name: string,
      port: string,
      login: string,
      password: string,
    },
    sender: {
      name: string,
      email: string,
    },
    templates: Array<{
      name: string,
      url: string,
    }>,
  },
  sms: {
    provider: string,
    login: string,
    password: string,
  },
  created_at: Date
  updated_at: Date
}

export interface IConfigurationUncheckedSchema {
  userId?: string,
  application?: {
    name?: string,
    channels?: {
      email?: boolean,
      sms?: boolean,
      webpush?: boolean,
    },
  },
  webPush?: {
    website?: {
      name?: string,
      url?: string,
      imageUrl?: string,
    },
    permissionMessage?: {
      msg?: string,
      allowButtonText?: string,
      denyButtonText?: string,
    },
    welcome?: {
      title?: string,
      msg?: string,
      enableUrl?: boolean,
      url?: string,
    },
  },
  email?: {
    server?: {
      name?: string,
      port?: string,
      login?: string,
      password?: string,
    },
    sender?: {
      name?: string,
      email?: string,
    },
    templates?: Array<{
      name: string,
      url: string,
    }>,
  },
  sms?: {
    provider?: string,
    login?: string,
    password?: string,
  },
  created_at?: Date
  updated_at?: Date
}

const ConfigurationSchema = new Schema({
  userId: { type: String },
  application: {
    name: { type: String },
    channels: {
      email: { type: Boolean },
      sms: { type: Boolean },
      webpush: { type: Boolean },
    },
  },
  webPush: {
    website: {
      name: { type: String },
      url: { type: String },
      imageUrl: { type: String },
    },
    permissionMessage: {
      msg: { type: String },
      allowButtonText: { type: String },
      denyButtonText: { type: String },
    },
    welcome: {
      title: { type: String },
      msg: { type: String },
      enableUrl: { type: Boolean },
      url: { type: String },
    },
  },
  email: {
    server: {
      name: { type: String },
      port: { type: String },
      login: { type: String },
      password: { type: String },
    },
    sender: {
      name: { type: String },
      email: { type: String },
    },
    templates: { type: Array },
  },
  sms: {
    provider: { type: String },
    login: { type: String },
    password: { type: String },
  },
},
{
  timestamps: true,
},
)

export const ConfigurationModel = (mongoose.models.user_config || mongoose.model('user_config', ConfigurationSchema))