import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "common/supabase";
import { SignUpFormKeys } from "sign-up/enums";
import { decryptPassword } from "helpers/decrypt-password";
import { parsePhoneNumber } from "helpers/parse-phone-number";

export default async function handler(
  { body: { data } }: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const { phone, password } = data;

  const parsedPhoneNumber = parsePhoneNumber(phone);

  const dataIncludesIncorrectValue = Object.values(data).some(
    (value) => typeof value !== "string"
  );

  if (dataIncludesIncorrectValue) {
    return res.status(400).json({ message: "Wrong phone value" });
  }

  const { data: users, error: userError } = await supabase
    .from("profiles")
    .select()
    .eq(SignUpFormKeys.PHONE_NUMBER, phone);

  if (users?.length) {
    return res
      .status(403)
      .json({ message: `Phone number ${phone} is already taken` });
  }

  if (userError) {
    return res.status(400).json({ message: userError.message });
  }

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
