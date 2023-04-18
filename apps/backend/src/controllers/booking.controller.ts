import prisma from "../prisma"
import dayjs from "dayjs"

type IBookingPayload = {
    created_by: string;
    items: string[]
}

export const createBooking = async (payload: IBookingPayload) => {
    const { created_by, items } = payload
    const bookItemIds = items.map(id => ({ id }))

    // Fetching book items
    const bookItemsData = await prisma.bookItem.findMany({
        where: { OR: bookItemIds }
    })

    // Error handling
    if (!bookItemsData.every((itm) => itm.isAvailable)) {
        throw {
            status: 400,
            message: 'Seems like one or more of your books became unavailable!'
        }
    }

    // Creating new booking to DB
    const newBooking = await prisma.booking.create({
        data: { created_by }
    })

    // Creating booking items payload
    const bookingItemsPayload = bookItemsData.map((itm) => ({
        created_by,
        booking_id: newBooking.id,
        book_item: itm.id,
        return_date: dayjs().add(itm.acceptedDuration, 'days').toISOString()
    }))

    // Creating booking items to DB
    await prisma.bookingItem.createMany({
        data: bookingItemsPayload
    })

    // Changing book item availability to false
    await prisma.bookItem.updateMany({
        where: { OR: bookItemIds },
        data: { isAvailable: false }
    })

    return ({ status: 200, message: 'Booking request placed successfully' })
}

export const getUserBookings = async (created_by: string) => {
    const bookings = await prisma.booking.findMany({
        where: {
            created_by,
        },
        include: {
            _count: {
                select: {
                    bookingItems: true
                }
            }
        }
    })
    return bookings
}

export const getBookingData = async (payload: { id: string, created_by: string }) => {
    const bookings = await prisma.booking.findMany({
        where: payload,
        include: {
            bookingItems: {
                include: {
                    bookItem: {
                        include: {
                            book: true
                        }
                    }
                }
            }
        }
    })
    return bookings
}