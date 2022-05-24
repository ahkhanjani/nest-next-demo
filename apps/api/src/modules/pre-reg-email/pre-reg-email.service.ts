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
    private readonly preRegModel: Model<PreRegEmailModel>,
  ) {}

  async checkExisting(email: string): Promise<boolean> {
    try {
      const preReg = await this.preRegModel.findOne({ email }).exec();
      if (preReg) return true;
      return false;
    } catch (err) {
      throw err;
    }
  }

  async create({ email }: CreatePreRegInput): Promise<PreRegResponse> {
    try {
      const createdReg = new this.preRegModel({
        email,
      });

      const reg = await createdReg.save();

      return { email: reg };
    } catch (err) {
      throw err;
    }
  }
}
