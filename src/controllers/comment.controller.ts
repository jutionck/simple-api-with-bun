import Elysia from "elysia";
import { verifyToken } from "../services/auth.service";
import { createComment, getAllCommentsForRecipe } from "../services/comment.service";
import { Routes } from "../config/app.routes";

export const commentController = (app: Elysia) => {
  app.post(Routes.POST_COMMENT, async (context) => {
    try {
      const authHeader = context.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      const recipeId = context.params.recipeId;

      if (!token) {
        throw new Error("Invalid token");
      }

      const verifiedToken = verifyToken(token as string);

      const commentData: any = context.body;

      const newComment = await createComment({
        body: commentData.body,
        recipeId: +recipeId,
        userId: verifiedToken?.id,
      });

      return newComment;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  });

  app.get(Routes.GET_COMMENT_LIST, async (context) => {
    try {
      const recipeId = context.params.recipeId;

      const comments = await getAllCommentsForRecipe(+recipeId);

      return {
        comments,
      };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  });
};