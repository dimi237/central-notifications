import { Request, Response, NextFunction, Express } from 'express';
import usersRoute from 'modules/users/users.route';
import authRoute from 'modules/auth/auth.route';
import notificationsRoute from 'modules/notifications/notifications.route';

const routes = (app: Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, content-type, x-access-token, authorization"
    );
    // res.setHeader( "Access-Control-Allow-Credentials", true );
    res.removeHeader("X-Powered-By");
    next();
  });

  app.use("/users", usersRoute);
  app.use("/auth", authRoute);
  app.use("/notify", notificationsRoute);

};

export default routes;
