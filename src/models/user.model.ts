import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

export enum rolesModel {
  user = "USER",
  admin = "ADMIN"
}

export interface UserModel extends Base {}
export class UserModel extends TimeStamps{

  @prop({unique: true, required: true})
  email: string;

  @prop()
  name: string

  @prop({required: true})
  passwordHash: string;

  @prop({default: rolesModel.user})
  role: rolesModel;
}

