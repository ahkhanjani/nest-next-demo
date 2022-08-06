import { Controller, Get, UseGuards, HttpStatus, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Controller()
export class AuthController {
  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<unknown> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: Request): Promise<unknown> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<unknown> {
    return HttpStatus.OK;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginRedirect(@Req() req: Request): Promise<unknown> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }
}
