import { NextApiResponse } from "next";
import { supabase } from "common/supabase";
import { SignUpFormKeys } from "sign-up/enums";
import { SendVerificationCodeRequest } from "sign-up/types";
import { SharedResponse } from "types/.";

export const checkDataType = (
  data: SendVerificationCodeRequest,
  res: NextApiResponse<SharedResponse>
) => {
  const dataIncludesIncorrectValue = Object.values(data).some(
    (value) => typeof value !== "string"
  );

  if (dataIncludesIncorrectValue) {
    return res.status(400).json({ message: "Wrong phone value" });
  }
};

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
