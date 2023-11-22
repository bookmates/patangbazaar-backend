require('./db/db')

const express = require('express')
const app = express()
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

const PORT = 3000

const cors = require('cors')
app.use(cors())

const { errorHandler } = require('./middlewares/error-handler.middleware')
const { routeNotFound } = require('./middlewares/route-not-found.middleware')
const { authVerify } = require('./middlewares/auth-verify.middleware')


const userRouter = require('./routers/user.router.js')
app.use('/user', authVerify, userRouter)

const authRouter = require('./routers/auth.router.js')
app.use('/auth', authRouter)

const bookRouter = require('./routers/book.router.js')
app.use('/books', bookRouter)

const categoryRouter = require('./routers/category.router.js')
app.use('/categories', categoryRouter)

const cartRouter = require('./routers/cart.router.js')
app.use('/user/cart', authVerify, cartRouter)

const wishlistRouter = require('./routers/wishlist.router.js')
app.use('/user/wishlist', authVerify, wishlistRouter)
app.use(routeNotFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('server started');
});