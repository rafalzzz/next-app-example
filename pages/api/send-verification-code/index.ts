import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "common/supabase";
import { SignUpFormKeys } from "sign-up/enums";
import { decryptPassword } from "helpers/decrypt-password";
import { parsePhoneNumber } from "helpers/parse-phone-number";
import { SharedResponse } from "types/.";
import { checkDataType, valueIsAvailable } from "./helpers";

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
    return res.status(400).json({ message: error.message });
  }

  return res
    .status(200)
    .json({ message: "We've send you SMS with verification code" });
}
