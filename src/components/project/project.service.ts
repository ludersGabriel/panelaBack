import { Project, ProjectCreateInput, ProjectUpdateInput } from './project.dto'
import { projectRepo } from './project.repo'

class ProjectService {
  private readonly repo = projectRepo

  async create (
    data: ProjectCreateInput,
    userId: string
  ): Promise<Project> {
    return this.repo.createProject(
      data,
      userId
    )
  }

  async update (
    data: ProjectUpdateInput,
    userId: string
  ): Promise<Project> {
    return this.repo.updateProject(data, userId)
  }

  async delete (
    id: string,
    userId: string
  ): Promise<Project> {
    return this.repo.deleteProject(id, userId)
  }

  async findAllByUser (
    userId: string
  ): Promise<Project[]> {
    return this.repo.projects(userId)
  }

  async find (
    id: string
  ): Promise<Project | null> {
    return this.repo.project(id)
  }
}

export const projectService = new ProjectService()
