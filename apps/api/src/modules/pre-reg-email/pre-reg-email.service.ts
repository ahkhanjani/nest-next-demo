import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// types
import { PreRegEmailModel } from './interfaces/pre-reg-email.interface';
import { PreRegResponse } from './dto/pre-reg-response.dto';
import { CreatePreRegInput } from './dto/create-pre-reg-input.dto';

@Injectable()
export class PreRegEmailsService {
  constructor(
    @InjectModel('pre-reg-emails')
    private readonly preRegModel: Model<PreRegEmailModel>
  ) {}

  async checkExisting(email: string): Promise<boolean> {
    const preReg = await this.preRegModel.findOne({ email }).exec();
    if (preReg) return true;
    return false;
  }

  async create({ email }: CreatePreRegInput): Promise<PreRegResponse> {
    const createdReg = new this.preRegModel({
      email,
    });
    const reg = await createdReg.save();
    return { email: reg };
  }
}
