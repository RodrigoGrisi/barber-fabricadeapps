import { Request, Response } from "express";

import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  constructor(protected readonly service: CreateUserService) {}

  async handle(request: Request, response: Response) {
    // aqui solicita as inforamçãoes do cliente via body.
    const { name, email, password } = request.body;

    // const createUserService = new CreateUserService();
    const user = await this.service.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }
}

export { CreateUserController };
