import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session, SessionModel } from './interface/session.interface';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name)
    private readonly sessionModel: Model<SessionModel>
  ) {}

  // ─── Query ──────────────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<Session> {
    return await this.sessionModel.findOne({ _id: id });
  }

  async findAll(filter?: FilterQuery<SessionModel>): Promise<Session[]> {
    return await this.sessionModel.find(filter);
  }

  // ─── Mutation ───────────────────────────────────────────────────────────────────

  async createOne(dto: CreateSessionDto): Promise<Session> {
    const session = await this.sessionModel.create(dto);
    return session;
  }
}
