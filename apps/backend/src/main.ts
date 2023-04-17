// import { StrictAuthProp } from '@clerk/clerk-sdk-node';
import express from 'express';
import * as path from 'path';
import categoriesRouter from './routes/categories.route';
import authRouter from './routes/auth.route'

type CustomRequestProps = {
  user?: {
    id: string;
    email: string;
    role: 'USER' | 'MANAGER'
  }
}
declare global {
  namespace Express {
    interface Request extends CustomRequestProps { }
  }
}

const app = express();
app.use(express.json({ limit: "50mb" }))


app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.get('/api', (req, res) => res.send({ message: 'Welcome to backend!' }));
app.use('/api/categories', categoriesRouter)
app.use('/api/auth', authRouter)


const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
