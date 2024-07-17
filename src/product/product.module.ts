import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductModel } from '../models/product.model';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ProductModel,
        schemaOptions: {
          collection: "Products"
        }
      }
    ])
  ]
})
export class ProductModule {}
