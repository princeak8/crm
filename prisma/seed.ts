import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
interface departmentType {
    name: string;
}
async function main() {
    const departments: departmentType[] = [{name: 'sales'}, {name: 'accounts'}];
    departments.forEach(async(department: departmentType) => {
        let data = department;
        return await prisma.department.create({
            data
        });
    })
//   const alice = await prisma.department.create({
//       data
//     });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })