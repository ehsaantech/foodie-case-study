import './common/env';
import Server from './common/server';
import routes from './routes';
import { connectDB } from './common/database';
import Seeds from './seeds/seeds';

connectDB()
  .then(async (connection) => {
    const seeding = new Seeds(connection);
    await seeding.userSeeding();
    await seeding.dishesSeeding();

  }, () => { });

export default new Server()
  .router(routes)
  .listen(parseInt(process.env.PORT, 10));