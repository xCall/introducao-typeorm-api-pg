import { Request, Response } from "express";
import { ListUserReceiverComplimentsService } from "../services/ListUserReceiverComplimentsService";

class ListUserReceiverComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUserReceiverComplementsService = new ListUserReceiverComplimentsService();

    const compliments = await listUserReceiverComplementsService.execute(user_id);

    return response.json(compliments);
  }
}

export { ListUserReceiverComplimentsController };