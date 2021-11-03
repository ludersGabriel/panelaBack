import { User, UserRegisterInput } from './user.dto'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Context } from '@src/context'

import { userService } from './user.service'

@Resolver(User)
export class UserResolver {
  private readonly service = userService

  @Mutation(() => User)
  async registerUser (
    @Arg('data') data: UserRegisterInput
  ): Promise<User> {
    return this.service.register(data)
  }

  @Authorized()
  @Mutation(() => User, { nullable: true })
  async deleteUser (
    @Ctx() ctx: Context
  ): Promise<User> {
    const { user } = ctx

    return this.service.delete(user.id)
  }

  @Authorized()
  @Query(() => User, { nullable: true })
  async user (
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const { user } = ctx
    return this.service.find(user.id)
  }

  @Authorized('admin')
  @Query(() => [User])
  async users (): Promise<User[]> {
    return this.service.findAll()
  }
}
