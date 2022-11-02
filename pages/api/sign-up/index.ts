import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "common/supabase";
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
    return res.status(400).json({ message: error.message });
  }

  if (verifiedUser.user?.id) {
    const { error: createUserError } = await supabase.from("profiles").insert({
      id: verifiedUser.user?.id,
      ...user_data,
      phone,
      password,
    });

    if (createUserError) {
      return res.status(400).json({ message: createUserError.message });
    }
  }

  return res.status(200).json({
    message: "Account has been created successfully - You can sign-in now",
  });
}
