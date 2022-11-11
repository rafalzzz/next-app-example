import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "common/supabase";
import { SIGNED_UP_SUCCESS_MESSAGE } from "sign-up/consts/messages";
import { generateResponseMessage } from "helpers/generate-response-message";
import { parsePhoneNumber } from "helpers/parse-phone-number";

export default async function handler(
  {
    body: {
      data: { user_data, token },
    },
  }: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const { phone, password } = user_data;

  const parsedPhone = parsePhoneNumber(phone);

  const { data: verifiedUser, error } = await supabase.auth.verifyOtp({
    phone: parsedPhone,
    token,
    type: "sms",
  });

  if (error) {
    return res.status(400).json(generateResponseMessage(error.message));
  }

  if (verifiedUser.user?.id) {
    const { error: createUserError } = await supabase.from("profiles").insert({
      id: verifiedUser.user?.id,
      ...user_data,
      phone,
      password,
    });

    if (createUserError) {
      return res
        .status(400)
        .json(generateResponseMessage(createUserError.message));
    }
  }

  return res
    .status(200)
    .json(generateResponseMessage(SIGNED_UP_SUCCESS_MESSAGE));
}
