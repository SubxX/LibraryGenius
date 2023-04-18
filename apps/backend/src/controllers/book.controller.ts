import prisma from "../prisma"


export const getAllBooks = async () => {
    const books = await prisma.book.findMany({
        include: {
            bookItems: {
                where: {
                    isAvailable: true
                }
            }
        }
    })
    return books
}

type IBookPayload = {
    ISBN: string;
    title: string;
    created_by: string;
    author_id: string;
    category_id: string
}
export const createBook = async (payload: IBookPayload) => {
    const book = await prisma.book.create({
        data: payload
    })
    return book
}
type IBookItemPayload = {
    acceptedDuration: number;
    isAvailable?: boolean;
    rack: number;
    created_by: string;
    book_id: string
}
export const createBookItem = async (payload: IBookItemPayload) => {
    const book = await prisma.bookItem.create({
        data: payload
    })
    return book
}