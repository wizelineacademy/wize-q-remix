import { DEFAULT_ERROR_MESSAGE } from "~/utils/backend/constants";
import generateSessionIdHash from "~/utils/backend/crypto";
import slack from '~/utils/backend/slackNotifications';
import { stripNewLines, truncate } from '~/utils/backend/stringUtils';

import { sanitizeHTML } from "~/utils/backend/sanitizer";
import { createQuestionSchema } from "~/utils/backend/validators/question";
import { db } from "~/utils/db.server"
import { SLACK_QUESTION_LIMIT } from "~/utils/backend/slackConstants";

export const createQuestion = async (body) => {
  const { error, value } = createQuestionSchema.validate(body);

  if (error) {
    return {
      errors: [
        {
          message: DEFAULT_ERROR_MESSAGE,
          detail: error,
        }
      ] 
    }
  }

  const { accessToken, ...rest } = value;

  let created = await db.Questions.create({
    data: {
      ...rest,
      question: sanitizeHTML(value.question),
    }
  });

  if (value.is_anonymous) {
    const sessionHash = generateSessionIdHash(accessToken, created.question_id);

    created = await db.Questions.update({
      where: {
        question_id: created.question_id,
      },
      data: {
        user_hash: sessionHash,
      }
    });
  }

  await slack.question(stripNewLines(truncate(value.question), SLACK_QUESTION_LIMIT));

  return {
    success: "Question has been created succesfully!",
    question: created,
  };
}