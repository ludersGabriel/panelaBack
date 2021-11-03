import { taskService } from '../src/components/task/task.service'
import { Task, TaskCreateInput, TaskUpdateInput } from '../src/components/task/task.dto'

describe('task service', () => {
  const service = taskService
  const userId = '6f5bd7a2-fa9a-4ea4-a9cf-4bd22e7b6570'
  const projectId = '4e27bc9d-a2c2-422c-92e2-20d934463a6a'

  test('should create a task', async () => {
    const taskData: TaskCreateInput = {
      name: 'task name',
      description: 'task description',
      completed: false
    }

    const task = await service.create(taskData, projectId, userId)
    expect(task).not.toBeNull()

    const dbTask = await service.find(task.id, userId)
    expect(dbTask).not.toBeNull()
    for (const key in dbTask) {
      if (!(key in taskData)) continue
      const castedKey = key as keyof TaskCreateInput
      expect(dbTask[key as keyof Task]).toBe(taskData[castedKey])
    }
  })

  test('should update a task', async () => {
    const taskData: TaskUpdateInput = {
      id: '73b900d9-9d1f-4cee-bf2d-2ee8c478d9ff',
      name: 'new name',
      description: 'new desc',
      completed: true
    }

    const task = await service.update(taskData, userId)
    expect(task).not.toBeNull()

    const dbTask = await service.find(task.id, userId)
    expect(dbTask).not.toBeNull()
    for (const key in dbTask) {
      if (!(key in taskData)) continue
      const castedKey = key as keyof TaskUpdateInput
      expect(dbTask[key as keyof Task]).toBe(taskData[castedKey])
    }
  })

  test('should delete a task', async () => {
    const taskData = {
      id: 'acaf7ccd-c258-4e17-bcf5-b214387a95da'
    }

    const task = await service.delete(taskData.id, userId)
    expect(task).not.toBeNull()
    expect(task.id).toBe(taskData.id)

    const dbTask = await service.find(taskData.id, userId)
    expect(dbTask).toBeNull()
  })

  test('should find all tasks', async () => {
    const tasks = await service.findAllByUser(userId)
    expect(tasks).toBeInstanceOf(Array)
    expect(tasks).toHaveLength(4)
  })

  test('should find a task', async () => {
    const taskData = {
      id: '79029a53-bd11-4665-82b4-e168e0399f86'
    }

    const task = await service.find(taskData.id, userId)
    expect(task).not.toBeNull()
    expect(task?.id).toBe(taskData.id)
  })
})
