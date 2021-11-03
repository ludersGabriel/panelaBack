import { SubTask, SubTaskCreateInput, SubTaskUpdateInput } from './subTask.dto'
import { Arg, Ctx, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Context } from '@src/context'

import { subTaskService } from './subTask.service'

@Resolver(SubTask)
export class SubTaskResolver {
  private readonly service = subTaskService

  @Authorized()
  @Mutation(() => SubTask)
  async createSubTask (
    @Arg('data') data: SubTaskCreateInput,
    @Arg('taskId') taskId: string,
    @Ctx() ctx: Context
  ): Promise<SubTask> {
    return this.service.create(data, taskId, ctx.user.id)
  }

  @Authorized()
  @Mutation(() => SubTask)
  async updateSubTask (
    @Arg('data') data: SubTaskUpdateInput,
    @Ctx() ctx: Context
  ): Promise<SubTask> {
    return this.service.update(data, ctx.user.id)
  }

  @Authorized()
  @Mutation(() => SubTask)
  async deleteSubTask (
    @Arg('id') subTaskId: string,
    @Ctx() ctx: Context
  ): Promise<SubTask> {
    return this.service.delete(subTaskId, ctx.user.id)
  }

  @Authorized()
  @Query(() => [SubTask])
  async subTasks (
    @Arg('taskId') taskId: string,
    @Ctx() ctx: Context
  ): Promise<SubTask[]> {
    return this.service.findAllByTask(taskId, ctx.user.id)
  }
}
