import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductListDto } from './dto';
import { CreateProductDto } from './dto/create-product';
import { UpdateProductDto } from './dto/update-product';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async productList(
    @Body() dto: ProductListDto,
    @Res() res: Response,
  ): Promise<any> {
    res.status(200).json({
      message: 'Product List',
      data: await this.productService.productList(dto),
      pagination: dto.page ? await this.productService.count(dto) : null,
    });
  }

  @Post('create')
  async createProduct(
    @Body() dto: CreateProductDto,
    @Res() res: Response,
  ): Promise<any> {
    await this.productService.createProduct(dto);
    res.status(200).json({
      message: 'Success create product',
      data: {
        name: dto.name,
        price: dto.price,
        weight: dto.weight,
        qty: dto.qty,
      },
    });
  }

  @Delete('/delete/:code')
  async deleteProduct(
    @Param('code') code: number,
    @Res() res: Response,
  ): Promise<any> {
    await this.productService.deleteProduct(code);
    res.status(200).json({
      message: 'Success remove product',
    });
  }

  @Patch('/update/:code')
  async updateProduct(
    @Body() dto: UpdateProductDto,
    @Param('code') code: number,
    @Res() res: Response,
  ): Promise<any> {
    await this.productService.updateProduct(code, dto);
    res.status(200).json({
      message: 'Success update product',
    });
  }

  @Get(':name')
  async productDetail(
    @Param('name') name: string,
    @Res() res: Response,
  ): Promise<any> {
    res.status(200).json({
      message: 'Product Detail',
      data: await this.productService.productDetail(name),
    });
  }
}
