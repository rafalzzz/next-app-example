import { NextApiResponse } from "next";
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
