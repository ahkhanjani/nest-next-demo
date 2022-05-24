import { Args, Resolver, Mutation, Subscription } from '@nestjs/graphql';
import { PreRegEmailsService } from './pre-reg-email.service';
import { PubSub } from 'graphql-subscriptions';
import { CreatePreRegInput } from './dto/create-pre-reg-input.dto';
import { PreRegEmail } from './interfaces/pre-reg-email.interface';
import { PreRegResponse } from './dto/pre-reg-response.dto';

const pubSub = new PubSub();

@Resolver()
export class PreRegEmailsResolver {
  constructor(private readonly preRegEmailsService: PreRegEmailsService) {}

  //
  // ─── QUERY ──────────────────────────────────────────────────────────────────────
  //

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  @Mutation(() => PreRegResponse)
  async createPreReg(
    @Args('input') input: CreatePreRegInput,
  ): Promise<PreRegResponse> {
    const res = await this.preRegEmailsService.create(input);

    // subscribe
    res.email && pubSub.publish('preRegCreated', { preRegCreated: res.email });

    return res;
  }

  //
  // ─── SUBSCRIPTION ───────────────────────────────────────────────────────────────
  //

  @Subscription(() => PreRegEmail, {
    name: 'preRegCreated',
  })
  createUserHandler() {
    return pubSub.asyncIterator('preRegCreated');
  }
}
