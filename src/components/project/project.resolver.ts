import { Project, ProjectCreateInput, ProjectUpdateInput } from './project.dto'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Context } from '@src/context'
import { projectService } from './project.service'

@Resolver(Project)
export class ProjectResolver {
  private readonly service = projectService

  @Authorized()
  @Mutation(() => Project)
  async createProject (
    @Arg('data') data: ProjectCreateInput,
    @Ctx() ctx: Context
  ): Promise<Project> {
    const userId = ctx.user.id

    return this.service.create(
      data,
      userId
    )
  }

  @Authorized()
  @Mutation(() => Project)
  async updateProject (
    @Arg('data') data: ProjectUpdateInput,
    @Ctx() ctx: Context
  ): Promise<Project> {
    return this.service.update(data, ctx.user.id)
  }

  @Authorized()
  @Mutation(() => Project)
  async deleteProject (
    @Arg('id') projectId: string,
    @Ctx() ctx: Context
  ): Promise<Project> {
    return this.service.delete(projectId, ctx.user.id)
  }

  @Authorized()
  @Query(() => [Project])
  async projects (
    @Ctx() ctx: Context
  ): Promise<Project[]> {
    return this.service.findAllByUser(ctx.user.id)
  }
}
