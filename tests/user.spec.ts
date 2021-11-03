import { User, UserRegisterInput } from '../src/components/user/user.dto'
import { userService } from '../src/components/user/user.service'

describe('user service', () => {
  const service = userService

  test('should register a user', async () => {
    const userData: UserRegisterInput = {
      email: 'test@test.com',
      name: 'test seed',
      password: '1234mudar'
    }

    const user = await service.register(userData)
    expect(user).not.toBeNull()

    const dbUser = await service.find(user.id)
    expect(dbUser).not.toBeNull()
    for (const key in dbUser) {
      if (!(key in userData) || key === 'password') continue
      const castedKey = key as keyof UserRegisterInput
      expect(dbUser[key as keyof User]).toBe(userData[castedKey])
    }
  })

  test('should delete a user', async () => {
    const userData = {
      id: '6f5bd7a2-fa9a-4ea4-a9cf-4bd22e7b6568'
    }

    const user = await service.delete(userData.id)
    expect(user).not.toBeNull()
    expect(user.id).toBe(userData.id)

    const checkUser = await service.find(userData.id)
    expect(checkUser).toBeNull()
  })

  test('should find a user', async () => {
    const userData = {
      id: '6f5bd7a2-fa9a-4ea4-a9cf-4bd22e7b6569'
    }

    const user = await service.find(userData.id)
    expect(user).not.toBeNull()
    expect(user?.id).toBe(userData.id)
  })

  test('should find all users', async () => {
    const users = await service.findAll()
    expect(users).toBeInstanceOf(Array)
    expect(users).toHaveLength(5)
  })
})
