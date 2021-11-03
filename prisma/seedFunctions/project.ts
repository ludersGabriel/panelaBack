import { prisma } from '../seed'

export const projectSeed = async () => {
  try {
    await Promise.all([
      prisma.project.create({
        data: {
          name: 'updateProject',
          description: 'updateProject',
          user: { connect: { id: '6f5bd7a2-fa9a-4ea4-a9cf-4bd22e7b6570' } },
          id: '8f91e9a0-e6a3-4942-8a59-13a6995fb035'
        }
      }),
      prisma.project.create({
        data: {
          name: 'deleteProject',
          description: 'deleteProject',
          user: { connect: { id: '6f5bd7a2-fa9a-4ea4-a9cf-4bd22e7b6570' } },
          id: 'a4c7ba35-f5d8-4cea-9aae-966fe4566a18'
        }
      }),
      prisma.project.create({
        data: {
          name: 'findProject',
          description: 'findProject',
          user: { connect: { id: '6f5bd7a2-fa9a-4ea4-a9cf-4bd22e7b6570' } },
          id: 'fe4b9a12-8a62-4374-94f5-ca52efa2a904'
        }
      }),
      prisma.project.create({
        data: {
          name: 'taskProject',
          description: 'taskProject',
          user: { connect: { id: '6f5bd7a2-fa9a-4ea4-a9cf-4bd22e7b6570' } },
          id: '4e27bc9d-a2c2-422c-92e2-20d934463a6a'
        }
      })
    ])

    console.log('\t[+] projects inserted'.green)
  } catch (e) {
    console.log(`\t[-] error inserting projects ${e}`.red)
  }
}
