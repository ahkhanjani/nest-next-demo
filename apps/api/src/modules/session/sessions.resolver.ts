import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { EnumsService } from '../enum/enums.service';
import { Enum } from '../enum/interface/enum.interface';
import { User } from '../user/interface/user.interface';
import { UsersService } from '../user/users.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './interface/session.interface';
import { SessionsService } from './sessions.service';

@Resolver(() => Session)
export class SessionsResolver {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly usersService: UsersService,
    private readonly enumsService: EnumsService,
  ) {}

  // ─── Resolve Field ──────────────────────────────────────────────────────────────

  @ResolveField(() => [User], { name: 'participants' })
  async getParticipants(
    @Parent() { participantIds }: Session,
  ): Promise<User[]> {
    return await Promise.all(
      participantIds.map(async (pid) => await this.usersService.findOne(pid)),
    );
  }

  @ResolveField(() => Enum, { name: 'status' })
  async getStatus(@Parent() { statusId }: Session): Promise<Enum> {
    return await this.enumsService.findOne(statusId);
  }

  // ─── Query ──────────────────────────────────────────────────────────────────────

  @Query(() => Session, { name: 'session' })
  async getSession(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Session> {
    return await this.sessionsService.findOne(id);
  }

  @Query(() => [Session], { name: 'sessionsByUser' })
  async getSessionsByUser(
    @Args('userId', { type: () => ID }) userId: string,
  ): Promise<Session[]> {
    return await this.sessionsService.findAll({ participantIds: [userId] });
  }

  // ─── Mutation ───────────────────────────────────────────────────────────────────

  @Mutation(() => Session)
  async createSession(
    @Args('dto', { type: () => CreateSessionDto }) dto: CreateSessionDto,
  ): Promise<Session> {
    return await this.sessionsService.createOne(dto);
  }

  @Mutation(() => Session)
  async updateSession(
    @Args('sessionId', { type: () => ID }) id: string,
    @Args('dto', { type: () => UpdateSessionDto }) dto: UpdateSessionDto,
  ): Promise<Session> {
    return await this.sessionsService.updateOne(id, dto);
  }
}
