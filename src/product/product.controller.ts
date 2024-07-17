import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UsePipes, ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ProductDto, updateDto } from './dto/product.dto';
import { PRODUCT_ALREADY_EXISTS_ERROR } from './product.constants';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':name')
  async findProductByName(@Param('name') name: string) {

  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteByName(@Param('title') title: string) {
    return this.productService.deleteByName(title)
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Put()
  async createProduct(@Body() productDto: ProductDto) {
    const oldProduct = await this.productService.findProductByName(productDto.title)
    if(oldProduct) throw new BadRequestException(PRODUCT_ALREADY_EXISTS_ERROR);

    return this.productService.createProduct(productDto);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Patch(':title')
  async updateByName(@Param('title') title: string,@Body() productDto: updateDto) {
    return this.productService.updateProduct(title, productDto)
  }

}
