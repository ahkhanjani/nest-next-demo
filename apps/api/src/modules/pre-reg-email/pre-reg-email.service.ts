import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PreRegEmailModel } from '@fm/nest/pre-reg-email/interface';
import { CreatePreRegInput, PreRegResponse } from '@fm/nest/pre-reg-email/dto';

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
