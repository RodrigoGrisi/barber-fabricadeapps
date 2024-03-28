import { Request, Response } from "express";
import { ListHaircutService } from "../../services/haircut/ListaHaircutService";

class ListHaircutController {
  async handle(request: Request, response: Response) {
    const user_id = request.user_id;
    const status = request.query.status as string;

    // Aqui o SERVICE conversa com o CONTROLLER
    const listHaircuts = new ListHaircutService();

    const haircuts = await listHaircuts.execute({
      user_id,
      status,
    });

    return response.json(haircuts);
  }
}

export { ListHaircutController };
