import { prisma } from '../src/context'

afterAll(async () => {
  await prisma.$disconnect()
})
