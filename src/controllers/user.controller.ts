import Elysia from "elysia";
import { createNewUser, login } from "../services/user.service";
import { Routes } from "../config/app.routes";

export const userController = (app: Elysia) => {
  app.post(Routes.POST_REGISTER, async (context) => {
    try {
      const payload: any = context.body;
      const newUser = await createNewUser({
        name: payload.name,
        email: payload.email,
        password: payload.password,
      });
      return { user: newUser }
    } catch (error: any) {
      return { error: error.message }
    }
  });

  app.post(Routes.POST_LOGIN, async (context) => {
    try {
      const payload: any = context.body;
      const loggedInUser = await login({
        email: payload.email,
        password: payload.password,
      });
      return loggedInUser;
    } catch (error: any) {
      return { error: error.message }
    }
  })
}