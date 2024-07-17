import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

export interface ProductDto extends Base {}
export class ProductDto extends TimeStamps{

  @prop()
  title: string

  @prop()
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