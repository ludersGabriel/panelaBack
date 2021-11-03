import { PrismaClient } from '@prisma/client'
import { projectSeed } from './seedFunctions/project'
import { taskSeed } from './seedFunctions/task'
import { userSeed } from './seedFunctions/user'
import { subTaskSeed } from './seedFunctions/subTask'
import 'colors'

export const prisma = new PrismaClient()

async function main () {
  await userSeed()
  await projectSeed()
  await taskSeed()
  await subTaskSeed()
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
