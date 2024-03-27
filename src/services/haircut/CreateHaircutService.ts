import { json } from "express";
import prismaClient from "../../prisma";

interface HaircutRequest {
  user_id: string;
  name: string;
  price: number;
}

// VERIFICAR QUANTOS MODELOS ESSE USUARIO JA TEM CADASTRADO
// VERIFICAR SE ELE É PREMIUM SE NAO LIMITAMOS A QUANTIDADE DE MODELOS PARA CADASTRAR

class CreateHaircutService {
  async execute({ user_id, name, price }: HaircutRequest) {
    if (!name || !price) {
      throw new Error("Invalid information");
    }

    const myHaircuts = await prismaClient.haircut.count({
      where: {
        user_id: user_id,
      },
    });

    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        subscriptions: true,
      },
    });

    // CRIANDO A VALIDADE E LIMITE
    if (myHaircuts >= 3 && user?.subscriptions?.status !== "active") {
      throw new Error("You have exceeded the cut limit on the basic plan");
    }

    const haircut = await prismaClient.haircut.create({
      data: {
        name: name,
        price: price,
        user_id: user_id,
      },
    });

    return haircut;
  }
}

export { CreateHaircutService };
