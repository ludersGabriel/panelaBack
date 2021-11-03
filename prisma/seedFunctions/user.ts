import bcrypt from 'bcryptjs'
import { prisma } from '../seed'

const hash = (str: string): Promise<string> => bcrypt.hash(str, 12)

export const userSeed = async () => {
  try {
    await Promise.all([
      prisma.user.create({
        data: {
          email: 'admin@gmail.com',
          name: 'admin',
          password: await hash('1234mudar'),
          role: 'admin',
          id: '21502fea-3df0-4fe5-945d-270fa7488892'
        }
      }),
      prisma.user.create({
        data: {
          email: 'updateUser@test.com',
          name: 'updateUser',
          password: await hash('1234mudar'),
          id: '6f5bd7a2-fa9a-4ea4-a9cf-4bd22e7b6567'
        }
      }),
      prisma.user.create({
        data: {
          email: 'deleteUser@test.com',
          name: 'deleteUser',
          password: await hash('1234mudar'),
          id: '6f5bd7a2-fa9a-4ea4-a9cf-4bd22e7b6568'
        }
      }),
      prisma.user.create({
        data: {
          email: 'findUser@test.com',
          name: 'findUser',
          password: await hash('1234mudar'),
          id: '6f5bd7a2-fa9a-4ea4-a9cf-4bd22e7b6569'
        }
      }),
      prisma.user.create({
        data: {
          email: 'projectUser@test.com',
          name: 'projectUser',
          password: await hash('1234mudar'),
          id: '6f5bd7a2-fa9a-4ea4-a9cf-4bd22e7b6570'
        }
      })
    ])

    console.log('\t[+] users inserted'.green)
  } catch (e) {
    console.log(`\t[-] error inserting users ${e}`.red)
  }
}
