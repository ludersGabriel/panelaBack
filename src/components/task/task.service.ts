import { Task, TaskCreateInput, TaskUpdateInput } from './task.dto'
import { taskRepo } from './task.repo'

class TaskService {
  private readonly repo = taskRepo

  async create (
    data: TaskCreateInput,
    projectId: string,
    userId: string
  ): Promise<Task> {
    return this.repo.create(
      data,
      userId,
      projectId
    )
  }

  async update (
    data: TaskUpdateInput,
    userId: string
  ): Promise<Task> {
    return this.repo.update(data, userId)
  }

  async delete (
    id: string,
    userId: string
  ): Promise<Task> {
    return this.repo.delete(id, userId)
  }

  async findAllByUser (
    userId: string
  ): Promise<Task[]> {
    return this.repo.findAll(userId)
  }

  async find (
    id: string,
    userId: string
  ): Promise<Task | null> {
    return this.repo.find(id, userId)
  }
}

export const taskService = new TaskService()
