import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "common/supabase";
import { SignUpFormKeys } from "sign-up/enums";
import { decryptPassword, parsePhoneNumber } from "helpers/index";

export default async function handler(
  { body: { data } }: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const { email, password } = data;

  const { data: users, error } = await supabase
    .from("profiles")
    .select()
    .eq(SignUpFormKeys.EMAIL, email);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  if (!users.length) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const encryptedUserPassword = decryptPassword(password);
  const encryptedRegisteredUserPassword = decryptPassword(users[0].password);
  const passwordIsCorrect =
    encryptedUserPassword === encryptedRegisteredUserPassword;

  if (!passwordIsCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const registeredUserPhone = parsePhoneNumber(users[0].phone);

  const { error: signInError } = await supabase.auth.signInWithPassword({
    phone: registeredUserPhone,
    password: encryptedUserPassword,
  });

  if (signInError) {
    return res.status(400).json({ message: signInError.message });
  }

  return res.status(200).json({
    message: "Signed-in successfully",
  });
}
