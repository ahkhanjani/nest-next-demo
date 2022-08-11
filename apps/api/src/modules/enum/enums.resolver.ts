import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { User } from '../user/interface/user.interface';
import { UsersService } from '../user/users.service';
import { Enum } from './interface/enum.interface';
import { EnumsService } from './enums.service';
import { GetEnumsDto } from './dto/get-enums.dto';
import { CreateEnumDto } from './dto/create-enum.dto';
import { UpdateEnumDto } from './dto/update-enum.dto';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';

// TODO Protect with better guards
@UseGuards(GqlAuthGuard)
@Resolver(() => Enum)
export class EnumsResolver {
  constructor(
    private readonly enumsService: EnumsService,
    private readonly usersService: UsersService,
  ) {}

  // ─── Resolve Field ──────────────────────────────────────────────────────────────

  @ResolveField(() => User, { name: 'creator' })
  async getCreator(@Parent() { creatorId }: Enum): Promise<User> {
    return await this.usersService.findOne(creatorId);
  }

  // ─── Query ──────────────────────────────────────────────────────────────────────

  @Query(() => Enum, { name: 'enum' })
  async getEnum(@Args('id', { type: () => ID }) id: string): Promise<Enum> {
    return await this.enumsService.findOne(id);
  }

  @Query(() => [Enum], { name: 'enums' })
  async getEnums(
    @Args('dto') { enumTitle, creatorId }: GetEnumsDto,
  ): Promise<Enum[]> {
    if (enumTitle) return await this.enumsService.findAll({ enumTitle });
    if (creatorId) return await this.enumsService.findAll({ creatorId });
    return await this.enumsService.findAll();
  }

  // ─── Mutation ───────────────────────────────────────────────────────────────────

  @Mutation(() => Enum, { name: 'createEnum' })
  async createEnum(@Args('dto') dto: CreateEnumDto): Promise<Enum> {
    return await this.enumsService.createOne(dto);
  }

  @Mutation(() => Enum, { name: 'createEnum' })
  async updateEnum(
    @Args('id', { type: () => String }) id: string,
    @Args('dto', { type: () => UpdateEnumDto }) dto: UpdateEnumDto,
  ): Promise<Enum> {
    return await this.enumsService.updateOne(id, dto);
  }
}
