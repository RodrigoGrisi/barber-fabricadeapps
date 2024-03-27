import prismaClient from "../../prisma";

interface HaircutRequest {
  user_id: string;
  status: boolean | boolean;
}

class ListHaircutService {
  async execute({ user_id, status }: HaircutRequest) {
    const haircut = prismaClient.haircut.findMany({
      where: {
        user_id: user_id,
        status: status,
      },
    });
  }
}
