import { Injectable } from '@nestjs/common';
import { UnusedRoute } from './helpers/otherRoutes';
import { definedRoutes } from './helpers/routesOfApi';

@Injectable()
export class AppService {

  index(): string {
    return 'Come to Van Rossum Tournaments!';
  }

  othersRoutes(): UnusedRoute {
    return {
      title: "Welcome to the Van Rossum Tournaments",
      message: "This route is not available, this is a list of all available routes.",
      status: 404,
      routes : definedRoutes
    }
  }

}
