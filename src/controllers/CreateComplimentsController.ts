import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentsService";

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { tag_id, user_receiver, user_sender, message } = request.body;

    const createComplimentsService = new CreateComplimentService();

    const compliments = await createComplimentsService.execute({
      tag_id,
      user_receiver,
      user_sender,
      message
    });

    return response.json(compliments);
  }
}

export { CreateComplimentController };
