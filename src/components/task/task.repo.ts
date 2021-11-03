import { prisma } from '@src/context'
import { Task, TaskCreateInput, TaskUpdateInput } from './task.dto'

class TaskRepo {
  private readonly prisma = prisma

  async create (
    data: TaskCreateInput,
    userId: string,
    projectId: string
  ): Promise<Task> {
    return this.prisma.task.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
        project: { connect: { id: projectId } }
      }
    })
  }

  async update (
    data: TaskUpdateInput,
    userId: string
  ): Promise<Task> {
    return this.prisma.task.update({
      where: {
        taskId_userId: {
          id: data.id,
          userId
        }
      },
      data
    })
  }

  async delete (
    taskId: string,
    userId: string
  ): Promise<Task> {
    return this.prisma.task.delete({
      where: {
        taskId_userId: {
          id: taskId,
          userId
        }
      }
    })
  }

  async find (
    taskId: string,
    userId: string
  ): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: {
        taskId_userId: {
          id: taskId,
          userId
        }
      }
    })
  }

  async findAll (
    userId: string
  ): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId: userId
      }
    })
  }
}

export const taskRepo = new TaskRepo()
