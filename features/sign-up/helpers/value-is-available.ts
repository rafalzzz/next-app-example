import { NextApiResponse } from "next";
import { supabase } from "common/supabase";
import { SignUpFormKeys } from "sign-up/enums";
import { SharedResponse } from "types/.";

export const valueIsAvailable = async ({
  key,
  value,
  res,
  message,
}: {
  key: SignUpFormKeys.EMAIL | SignUpFormKeys.PHONE_NUMBER;
  value: string;
  res: NextApiResponse<SharedResponse>;
  message: string;
}) => {
  const { data, error } = await supabase
    .from("profiles")
    .select(key)
    .eq(key, value);

  if (data?.length) {
    return res.status(403).json({ message });
  }

  if (error) {
    return res.status(400).json({ message: error.message });
  }
};
