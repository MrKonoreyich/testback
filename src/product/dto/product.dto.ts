import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { IsArray, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export interface ProductDto extends Base {}
export class ProductDto extends TimeStamps{

  @IsString()
  title: string

  @IsNumber({allowNaN: false})
  @Min(1)
  @Type( () => Number)
  price: number

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsArray()
  @IsString({each: true})
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


export class updateDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsNumber({allowNaN: false})
  @Min(1)
  @Type( () => Number)
  price?: number

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsOptional()
  @IsArray()
  @IsString({each: true})
  @Type(() => String)
  categories: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => ProductCharacteristics)
  characteristics?: ProductCharacteristics[]
}