import { Query, Resolver } from '@nestjs/graphql';
// modules
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  getHello(): string {
    return this.appService.getHello();
  }
}
