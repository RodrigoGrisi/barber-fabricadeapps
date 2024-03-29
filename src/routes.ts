import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { UpdateUserController } from "./controllers/user/UpdateUserController";
import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController";
import { CreateUserService } from "./services/user/CreateUserService";
import { ListHaircutController } from "./controllers/haircut/ListHaircutController";

const router = Router();

// --- ROTAS USER //
router.post("/users", new CreateUserController(new CreateUserService()).handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.put("/users", isAuthenticated, new UpdateUserController().handle);

// --- ROTAS HAIRCUT
router.post("/haircut", isAuthenticated, new CreateHaircutController().handle);
router.get("/haircuts", isAuthenticated, new ListHaircutController().handle);

export { router };
