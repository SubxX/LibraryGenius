import prisma from "../prisma"
import bcrypt from 'bcrypt'
import { signToken } from "../utils/jwt.utils";
import { excludePassword } from "../utils/app.utils";


export const login = async (payload: { email: string; password: string; isManager?: boolean }) => {
    const { email, password, isManager } = payload
    const initiator = !isManager ? prisma.user.findUnique : prisma.manager.findUnique
    const user = await initiator.call(prisma, {
        where: { email }
    })

    if (!user) throw { status: 400, message: 'Invalid credentials' }
    const isPasswordMatch = await bcrypt.compareSync(password, user.password)
    if (!isPasswordMatch) throw { status: 400, message: 'Invalid credentials' }
    return ({ token: signToken(excludePassword(user)) })
}