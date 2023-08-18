import express from 'express';
import cors from 'cors';
import userRoute from './route/userRoute';
import bodyParser from 'body-parser';
import productRoute from './route/productRoute';
import cartRoute from './route/cartRoute';
import orderRoute from './route/orderRoute';

const app = express();
const port = 4001;
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

userRoute(app);
productRoute(app);
cartRoute(app);
orderRoute(app);

app.listen(port, () => {
  console.log(`server is listening on ${process.env.ENV} at localhost:${port}`);
});
export default app;
