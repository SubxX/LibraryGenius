import {
    ClerkExpressRequireAuth,
} from '@clerk/clerk-sdk-node';

export const requireAuthMiddleware = ClerkExpressRequireAuth({})


