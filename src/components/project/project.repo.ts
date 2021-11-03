import { prisma } from '@src/context'
import { Project, ProjectCreateInput, ProjectUpdateInput } from './project.dto'

class ProjectRepo {
  private readonly prisma = prisma

  async createProject (
    data: ProjectCreateInput,
    userId: string
  ): Promise<Project> {
    return this.prisma.project.create({
      data: {
        ...data,
        user: { connect: { id: userId } }
      }
    })
  }

  async updateProject (
    data: ProjectUpdateInput,
    userId: string
  ): Promise<Project> {
    return this.prisma.project.update({
      where: {
        projectId_userId: {
          id: data.id,
          userId
        }
      },
      data
    })
  }

  async deleteProject (
    id: string,
    userId: string
  ): Promise<Project> {
    return this.prisma.project.delete({
      where: {
        projectId_userId: {
          id,
          userId
        }
      }
    })
  }

  async project (
    id: string
  ): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: {
        id
      }
    })
  }

  async projects (
    userId: string
  ): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: {
        userId
      }
    })
  }
}

export const projectRepo = new ProjectRepo()
