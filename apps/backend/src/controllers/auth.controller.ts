import prisma from "../prisma"
import bcrypt from 'bcrypt'
import { signToken } from "../utils/jwt.utils";
import { excludePassword } from "../utils/app.utils";

type ICreateUser = {
    email: string
    password: string
    name: string
    role?: 'USER' | 'MANAGER'
}

export const createUser = async (payload: ICreateUser) => {
    const password = await bcrypt.hashSync(payload.password, 10)
    const newUser = await prisma.user.create({
        data: { ...payload, password }
    })
    return excludePassword(newUser)
}


type ISignin = { email: string; password: string }
export const signinUser = async (payload: ISignin) => {
    const { email, password } = payload
    const user = await prisma.user.findUniqueOrThrow({
        select: { id: true, password: true, email: true, role: true },
        where: { email }
    })
    const isPasswordMatch = await bcrypt.compareSync(password, user.password)
    if (!isPasswordMatch) throw { status: 400, message: 'Invalid credentials' }
    return ({ token: signToken(excludePassword(user)) })
}

export const getUser = async (id: string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: { id }
    })
    return excludePassword(user)
}