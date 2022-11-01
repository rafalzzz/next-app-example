import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "common/supabase";
import { decryptPassword } from "helpers/decrypt-password";
import { parsePhoneNumber } from "helpers/parse-phone-number";

export default async function handler(
  { body: { data } }: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const { phone, password } = data;

  const dataIncludesIncorrectValue = Object.values(data).some(
    (value) => typeof value !== "string"
  );

  if (dataIncludesIncorrectValue) {
    return res.status(400).json({ message: "Wrong phone value" });
  }

  const { data: signUpData, error } = await supabase.auth.signUp({
    phone: parsePhoneNumber(phone),
    password: decryptPassword(password),
  });

  console.log({ signUpData, error });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return res
    .status(200)
    .json({ message: "We've send you SMS with verification code" });
}
