import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({ email });

    if (!user) {
      throw new Error("Email or Password incorrect");
    }

    const passwordMath = await compare(password, user.password);

    if (!passwordMath) {
      throw new Error("Email or Password incorrect");
    }

    const token = sign(
      {
        email: user.email,
      },
      "8e3797e58b1e2b902b4ff84b7a62e227",
      { subject: user.id, expiresIn: "1d" }
    );

    return token;
  }
}

export { AuthenticateUserService };
