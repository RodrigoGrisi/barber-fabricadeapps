import prismaClient from "../../prisma";
import { Haircut } from ".prisma/client";

interface HaircutRequest {
  user_id: string;
  status: boolean | string;
}

class ListHaircutService {
  async execute({ user_id, status }: HaircutRequest): Promise<Haircut[]> {
    // Utilize o findMany para buscar todos os cortes de cabelo com base nos filtros
    const haircuts = await prismaClient.haircut.findMany({
      where: {
        user_id: user_id,
        status: status === "true" ? true : false,
      },
    });

    // Verifique se há cortes de cabelo retornados
    if (!haircuts) {
      throw new Error("Cuts not found");
    }

    return haircuts;
  }
}

export { ListHaircutService };
