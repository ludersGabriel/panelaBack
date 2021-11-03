import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main () {
  // await prisma.user.create(({
  //   data: {
  //     email: 'teste@gmail.com',
  //     password: '1234mudar',
  //     name: 'bala de goma'
  //   }
  // }))

  // const allUsers = await prisma.user.findMany()

  // const allUsers = await prisma.user.update({
  //   where: {
  //     id: '435166be-bc39-49b4-874f-6920a70451fd'
  //   },
  //   data: {
  //     name: 'new name'
  //   }
  // })

  // console.log(allUsers)

  const many = await prisma.project.deleteMany({
    where: {
      id: 'fe4b9a12-8a62-4374-94f5-ca52efa2a904',
      userId: '6f5bd7a2-fa9a-4ea4-a9cf-4bd22e7b6570'
    }
  })

  console.log(many)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
