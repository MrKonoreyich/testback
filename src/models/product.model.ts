import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

export interface ProductModel extends Base {}
export class ProductModel extends TimeStamps{

  @prop({unique: true, required: true})
  title: string

  @prop({required: true, min: 0})
  price: number

  @prop()
  description: string;

  @prop()
  image: string;

  @prop({type: () => [String]})
  categories: string[];

  @prop({type: () => [ProductCharacteristics], _id: false})
  characteristics: ProductCharacteristics[]
}

class ProductCharacteristics {

  @prop()
  name: string;

  @prop()
  value: string
}