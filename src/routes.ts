import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";

const router = Router();

// router.get("/teste", (req: Request, res: Response) => {
//   // throw new Error("TESTE AQUI")
//   return res.json({ ok: false });
// });

//ROTAS USER //

router.post("/users", new CreateUserController().handle);

export { router };
