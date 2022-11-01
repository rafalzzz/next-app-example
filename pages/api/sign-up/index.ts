import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "common/supabase";
import { parsePhoneNumber } from "helpers/parse-phone-number";

export default async function handler(
  {
    body: {
      data: { user_data, code },
    },
  }: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const { phone } = user_data;

  const parsedPhone = parsePhoneNumber(phone);

  const { data, error } = await supabase.auth.verifyOtp({
    phone: parsedPhone,
    token: code,
    type: "sms",
  });

  console.log({ data });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return res.status(200).json({
    message: "Account has been created successfully - You can sign-in now",
  });
}
