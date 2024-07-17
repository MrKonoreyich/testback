import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ProductModel } from '../models/product.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ProductDto, updateDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel> ) {}

  async findProductByName(title: string) {
    return this.productModel.findOne({ title: title }).exec();
  }

  async deleteByName(title: string) {
    return this.productModel.deleteOne({ title: title }).exec();
  }

  async createProduct(dto: ProductModel) {
    const product = new this.productModel(dto);

    return product.save();
  }

  async updateProduct(title, dto: updateDto) {
    return this.productModel.updateOne({title: title}, dto)
  }

}
