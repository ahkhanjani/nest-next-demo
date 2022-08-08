import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Enum, EnumModel } from './interface/enum.interface';
import { CreateEnumDto } from './dto/create-enum.dto';
import { UpdateEnumDto } from './dto/update-enum.dto';

@Injectable()
export class EnumsService {
  constructor(
    @InjectModel(Enum.name)
    private readonly enumModel: Model<EnumModel>
  ) {}

  // ─── Query ──────────────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<Enum> {
    return await this.enumModel.findOne({ _id: id });
  }

  async findAll(filter?: FilterQuery<EnumModel>): Promise<Enum[]> {
    return await this.enumModel.find(filter);
  }

  // ─── Mutation ───────────────────────────────────────────────────────────────────

  async createOne(dto: CreateEnumDto): Promise<Enum> {
    return await this.enumModel.create(dto);
  }

  async updateOne(enumId: string, dto: UpdateEnumDto): Promise<Enum> {
    return await this.enumModel.findByIdAndUpdate(enumId, dto);
  }
}
