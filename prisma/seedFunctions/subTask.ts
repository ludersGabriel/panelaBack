import { prisma } from '../seed'

export const subTaskSeed = async () => {
  try {
    await Promise.all([
      prisma.subTask.create({
        data: {
          name: 'findSubTask name',
          description: 'findSubTask description',
          task: { connect: { id: '4eea2ed8-ca3e-4567-b696-298fdf7d288e' } },
          id: '564d4129-64a5-4d85-a637-589f0639506f',
          user: { connect: { id: '6f5bd7a2-fa9a-4ea4-a9cf-4bd22e7b6570' } }
        }
      }),
      prisma.subTask.create({
        data: {
          name: 'updateSubTask name',
          description: 'updateSubTask description',
          task: { connect: { id: '4eea2ed8-ca3e-4567-b696-298fdf7d288e' } },
          id: '764d4129-64a5-4d85-a637-589f0639508f',
          user: { connect: { id: '6f5bd7a2-fa9a-4ea4-a9cf-4bd22e7b6570' } }
        }
      }),
      prisma.subTask.create({
        data: {
          name: 'deleteSubTask name',
          description: 'deleteSubTask description',
          task: { connect: { id: '4eea2ed8-ca3e-4567-b696-298fdf7d288e' } },
          id: '864d4129-64a5-4d85-a637-589f0639503f',
          user: { connect: { id: '6f5bd7a2-fa9a-4ea4-a9cf-4bd22e7b6570' } }
        }
      })

    ])
    console.log('\t[+] subTasks inserted'.green)
  } catch (e) {
    console.log(`\t[-] error inserting subTasks ${e}`.red)
  }
}
