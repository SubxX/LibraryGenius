import prisma from "../prisma"


export const createAuthor = async (payload: { name: string; created_by: string }) => {
    const newAuthor = await prisma.author.create({
        data: payload
    })
    return newAuthor
}

export const getAuthors = async () => {
    const authors = await prisma.author.findMany()
    return authors
}