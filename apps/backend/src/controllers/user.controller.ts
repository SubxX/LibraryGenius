import prisma from "../prisma"
import bcrypt from 'bcrypt'
import { excludePassword } from "../utils/app.utils";

type ICreateUser = {
    email: string
    password: string
    name: string
    isManager?: boolean
}

/**
 * @author  Subham
 * @purpose Based on isManager it creates user on either user table of manager table
 * @returns A new user
 */
export const createUser = async (payload: ICreateUser) => {
    const { isManager, ...rest } = payload
    const initiator = !isManager ? prisma.user.create : prisma.manager.create

    const password = await bcrypt.hashSync(rest.password, 10)
    const newUser = await initiator.call(prisma, {
        data: { ...rest, password }
    })
    return excludePassword(newUser)
}

/**
 * @author  Subham
 * @purpose Based on isManager it gets user from either user table of manager table
 * @returns A new user
 */
export const getUser = async (id: string, isManager: boolean) => {
    const initiator = !isManager ? prisma.user.findUnique : prisma.manager.findUnique
    const user = await initiator.call(prisma, {
        where: { id }
    })
    if (!user) throw { status: 400, message: `${isManager ? 'Manager' : 'User'} not found` }
    return excludePassword(user)
}
