import prisma from "../prisma"

export const getAllCategories = async () => {

    const allUsers = await prisma.user.findMany()
    return allUsers
}