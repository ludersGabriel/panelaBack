import { SubTask, SubTaskCreateInput, SubTaskUpdateInput } from './subTask.dto'
import { subTaskRepo } from './subTask.repo'

class SubTaskService {
  private readonly repo = subTaskRepo

  async create (
    data: SubTaskCreateInput,
    taskId: string,
    userId: string
  ): Promise<SubTask> {
    return this.repo.create(
      data,
      taskId,
      userId
    )
  }

  async update (
    data: SubTaskUpdateInput,
    userId: string
  ): Promise<SubTask> {
    return this.repo.update(data, userId)
  }

  async delete (
    id: string,
    userId: string
  ): Promise<SubTask> {
    return this.repo.delete(id, userId)
  }

  async findAllByTask (
    taskId: string,
    userId: string
  ): Promise<SubTask[]> {
    return this.repo.findAll(taskId, userId)
  }

  async find (
    id: string,
    userId: string
  ): Promise<SubTask | null> {
    return this.repo.find(id, userId)
  }
}

export const subTaskService = new SubTaskService()
