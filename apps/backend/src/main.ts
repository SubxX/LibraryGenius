import express from 'express';
import * as path from 'path';

import categoriesRouter from './routes/categories.route';
import authRouter from './routes/auth.route'
import authorsRouter from './routes/author.route'
import bookRouter from './routes/book.route'
import bookingRouter from './routes/booking.route'

type CustomRequestProps = {
  user?: {
    id: string;
    email: string;
    isAdmin?: boolean;
    isVerified?: boolean
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
app.get('/api', (_, res) => res.send({ status: 200, message: 'Library Genius API is working fine!' }));
app.use('/api/categories', categoriesRouter)
app.use('/api/auth', authRouter)
app.use('/api/author', authorsRouter)
app.use('/api/book', bookRouter)
app.use('/api/booking', bookingRouter)


const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

const errorLogger = (err, req, res, next) => {
  res.status(err?.status ?? 500)
    .send({
      status: err?.status ?? 500,
      message: err?.message ?? 'Internal server error'
    })
}

app.use(errorLogger)

