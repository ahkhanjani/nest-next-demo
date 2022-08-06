import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../user/interface/user.interface';
import { UsersService } from '../user/users.service';
import { Session } from './interface/session.interface';
import { SessionsService } from './sessions.service';

@Resolver(() => Session)
export class SessionsResolver {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly usersService: UsersService
  ) {}

  // ─── Resolve Field ──────────────────────────────────────────────────────────────

  @ResolveField(() => User, { name: 'student' })
  async getStudent(@Parent() { studentId }: Session): Promise<User> {
    return await this.usersService.findOne(studentId);
  }

  @ResolveField(() => User, { name: 'teacher' })
  async getTeacher(@Parent() { teacherId }: Session): Promise<User> {
    return await this.usersService.findOne(teacherId);
  }

  // ─── Query ──────────────────────────────────────────────────────────────────────

  @Query(() => Session, { name: 'session' })
  async getSession(
    @Args('id', { type: () => ID }) id: string
  ): Promise<Session> {
    return await this.sessionsService.findOne(id);
  }

  @Query(() => [Session], { name: 'sessions' })
  async getSessions(): Promise<Session[]> {
    return await this.sessionsService.findAll();
  }
}
