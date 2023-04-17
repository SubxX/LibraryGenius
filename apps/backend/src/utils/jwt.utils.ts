import jwt from 'jsonwebtoken'

const SECRET = 'TEStaaTTAv1231asfa26#151'

export const signToken = (data: Record<string, any>, options?: jwt.SignOptions) => {
    return jwt.sign(data, SECRET, options)
}

export const verifyToken = (token: string, options?: jwt.VerifyOptions) => {
    return jwt.verify(token, SECRET, options)
}