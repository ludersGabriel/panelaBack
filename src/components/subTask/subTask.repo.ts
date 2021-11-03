import { prisma } from '@src/context'
import { SubTask, SubTaskCreateInput, SubTaskUpdateInput } from './subTask.dto'

class SubTaskRepo {
  private readonly prisma = prisma

  async create (
    data: SubTaskCreateInput,
    taskId: string,
    userId: string
  ): Promise<SubTask> {
    return prisma.subTask.create({
      data: {
        ...data,
        task: { connect: { id: taskId } },
        user: { connect: { id: userId } }
      }
    })
  }

  async update (
    data: SubTaskUpdateInput,
    userId: string
  ): Promise<SubTask> {
    return this.prisma.subTask.update({
      where: {
        subTaskId_userId: {
          id: data.id,
          userId
        }
      },
      data
    })
  }

  async delete (
    subTaskId: string,
    userId: string
  ): Promise<SubTask> {
    return this.prisma.subTask.delete({
      where: {
        subTaskId_userId: {
          id: subTaskId,
          userId
        }
      }
    })
  }

  async find (
    subTaskId: string,
    userId: string
  ): Promise<SubTask | null> {
    return this.prisma.subTask.findUnique({
      where: {
        subTaskId_userId: {
          id: subTaskId,
          userId
        }
      }
    })
  }

  async findAll (
    taskId: string,
    userId: string
  ): Promise<SubTask[]> {
    return this.prisma.subTask.findMany({
      where: {
        taskId,
        userId
      }
    }
    )
  }

  async taskBySubTask (
    subTaskId: string,
    userId: string
  ): Promise<SubTask | null> {
    return this.prisma.subTask.findUnique({
      where: {
        subTaskId_userId: {
          id: subTaskId,
          userId
        }
      },
      include: { task: true }
    })
  }
}

export const subTaskRepo = new SubTaskRepo()
