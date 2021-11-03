import { hash } from '@utils/auth'
import { userRepo } from './user.repo'
import { User, UserRegisterInput } from './user.dto'

class UserService {
  private readonly repo = userRepo

  async register (
    data: UserRegisterInput
  ): Promise<User> {
    const hashedPassword = await hash(data.password)

    return this.repo.registerUser(
      {
        email: data.email,
        name: data.name,
        password: hashedPassword
      }
    )
  }

  async delete (
    id: string
  ): Promise<User> {
    return this.repo.deleteUser(id)
  }

  async find (
    id: string
  ): Promise<User | null> {
    return this.repo.user(id)
  }

  async findAll () {
    return this.repo.users()
  }
}

export const userService = new UserService()
