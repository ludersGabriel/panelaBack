import { projectService } from '../src/components/project/project.service'
import { Project, ProjectCreateInput, ProjectUpdateInput } from '../src/components/project/project.dto'

describe('project service', () => {
  const service = projectService
  const userId = '6f5bd7a2-fa9a-4ea4-a9cf-4bd22e7b6570'

  test('should create a project', async () => {
    const projectData: ProjectCreateInput = {
      name: 'create project',
      description: 'create project desc'
    }

    const project = await service.create(projectData, userId)
    expect(project).not.toBeNull()

    const dbProject = await service.find(project.id)
    expect(dbProject).not.toBeNull()
    for (const key in dbProject) {
      if (!(key in projectData)) continue
      const castedKey = key as keyof ProjectCreateInput
      expect(dbProject[key as keyof Project]).toBe(projectData[castedKey])
    }
  })

  test('should update a project', async () => {
    const projectData: ProjectUpdateInput = {
      id: '8f91e9a0-e6a3-4942-8a59-13a6995fb035',
      description: 'new desc',
      name: 'new name'
    }

    const project = await service.update(projectData, userId)
    expect(project).not.toBeNull()

    const dbProject = await service.find(projectData.id)
    expect(dbProject).not.toBeNull()
    for (const key in dbProject) {
      if (!(key in projectData)) continue
      const castedKey = key as keyof ProjectCreateInput
      expect(dbProject[key as keyof Project]).toBe(projectData[castedKey])
    }
  })

  test('should delete a project', async () => {
    const projectData = {
      id: 'a4c7ba35-f5d8-4cea-9aae-966fe4566a18'
    }

    const project = await service.delete(projectData.id, userId)
    expect(project).not.toBeNull()
    expect(project.id).toBe(projectData.id)

    const dbProject = await service.find(projectData.id)
    expect(dbProject).toBeNull()
  })

  test('should find all projects', async () => {
    const projects = await service.findAllByUser(userId)
    expect(projects).toBeInstanceOf(Array)
    expect(projects).toHaveLength(4)
  })

  test('should find a project', async () => {
    const projectData = {
      id: 'fe4b9a12-8a62-4374-94f5-ca52efa2a904'
    }

    const project = await service.find(projectData.id)
    expect(project).not.toBeNull()
    expect(project?.id).toBe(projectData.id)
  })
})
