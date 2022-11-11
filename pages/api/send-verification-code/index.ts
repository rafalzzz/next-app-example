import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "common/supabase";
import { SEND_VERIFICATION_CODE_SUCCESS_MESSAGE } from "sign-up/consts/messages";
import { SignUpFormKeys } from "sign-up/enums";
import { checkDataType, valueIsAvailable } from "sign-up/helpers";
import { decryptPassword } from "helpers/decrypt-password";
import { generateResponseMessage } from "helpers/generate-response-message";
import { parsePhoneNumber } from "helpers/parse-phone-number";
import { SharedResponse } from "types/.";

export default async function handler(
  { body: { data } }: NextApiRequest,
  res: NextApiResponse<SharedResponse>
) {
  const { email, phone, password } = data;

  const parsedPhoneNumber = parsePhoneNumber(phone);

  checkDataType(data, res);

  await valueIsAvailable({
    key: SignUpFormKeys.EMAIL,
    value: email,
    message: `Email ${email} is already taken`,
    res,
  });

  await valueIsAvailable({
    key: SignUpFormKeys.PHONE_NUMBER,
    value: phone,
    message: `Phone number ${phone} is already taken`,
    res,
  });

  const { error } = await supabase.auth.signUp({
    phone: parsedPhoneNumber,
    password: decryptPassword(password),
  });

  if (error) {
    return res.status(400).json(generateResponseMessage(error.message));
  }

  return res
    .status(200)
    .json(generateResponseMessage(SEND_VERIFICATION_CODE_SUCCESS_MESSAGE));
}
