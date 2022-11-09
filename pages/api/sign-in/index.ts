import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "common/supabase";
import * as C from "sign-in/consts";
import { SignUpFormKeys } from "sign-up/enums";
import { decryptPassword, generateResponseMessage } from "helpers/index";
import { CookieNames } from "enums/cookie-names";
import { generateToken } from "./helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body.data;

  const { data: users, error } = await supabase
    .from("profiles")
    .select()
    .eq(SignUpFormKeys.EMAIL, email);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  if (!users.length) {
    return res
      .status(400)
      .json(generateResponseMessage(C.USER_DOES_NOT_EXIST_MESSAGE));
  }

  const encryptedUserPassword = decryptPassword(password);
  const encryptedRegisteredUserPassword = decryptPassword(users[0].password);
  const passwordIsCorrect =
    encryptedUserPassword === encryptedRegisteredUserPassword;

  if (!passwordIsCorrect) {
    return res
      .status(400)
      .json(generateResponseMessage(C.INCORRECT_PASSWORD_MESSAGE));
  }

  const token = generateToken(users[0].id);

  const serialised = serialize(CookieNames.TOKEN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    path: "/",
  });

  res.setHeader("Set-Cookie", serialised);

  return res
    .status(200)
    .json(generateResponseMessage(C.SIGNED_IN_SUCCESS_MESSAGE));
}
