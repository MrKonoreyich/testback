import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export interface ProductDto extends Base {}
export class ProductDto extends TimeStamps{

  @IsString()
  title: string

  @IsNumber()
  price: number

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => String)
  categories: string[];

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => ProductCharacteristics)
  characteristics: ProductCharacteristics[]
}

class ProductCharacteristics {

  @IsString()
  name: string;

  @IsString()
  value: string
}