import prisma from "../prisma"


export const getAllCategories = async () => {
    const categories = await prisma.category.findMany()
    return categories
}

export const createCategory = async (payload: { name: string; created_by: string }) => {
    const existingCategory = await prisma.category.findFirst({
        where: { name: payload.name }
    })
    if (existingCategory) throw { status: 409, message: `Category already exist with name "${payload.name}"` }

    const newCategory = await prisma.category.create({ data: payload })
    return newCategory
}