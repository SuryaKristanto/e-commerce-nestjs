import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Roles } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { AddRemoveWishlistDto } from './dto';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
@UseGuards(JwtGuard, RolesGuard)
@Roles('admin', 'member')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  async addWishlist(
    @Req() req: Request,
    @Body() dto: AddRemoveWishlistDto,
    @Res() res: Response,
  ): Promise<any> {
    const user: any = req.user;
    await this.wishlistService.addWishlist(user.user_id, dto);
    res.status(200).json({
      message: 'Added to wishlist',
    });
  }

  @Get()
  async getWishlist(@Req() req: Request, @Res() res: Response): Promise<any> {
    const user: any = req.user;
    res.status(200).json({
      message: 'WishList',
      data: await this.wishlistService.getWishlist(user.user_id),
    });
  }

  @Delete()
  async removeWishlist(
    @Req() req: Request,
    @Body() dto: AddRemoveWishlistDto,
    @Res() res: Response,
  ): Promise<any> {
    const user: any = req.user;
    await this.wishlistService.removeWishlist(user.user_id, dto);
    res.status(200).json({
      message: 'Removed from wishlist',
    });
  }
}
