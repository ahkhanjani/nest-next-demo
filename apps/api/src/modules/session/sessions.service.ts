import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session, SessionModel } from './interface/session.interface';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name)
    private readonly sessionModel: Model<SessionModel>
  ) {}

  async findOne(id: string): Promise<Session> {
    return await this.sessionModel.findOne({ _id: id });
  }

  async findAll(filter?: FilterQuery<SessionModel>): Promise<Session[]> {
    return await this.sessionModel.find(filter);
  }
}
