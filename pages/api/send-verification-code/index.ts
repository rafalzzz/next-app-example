import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  console.log({ _req });
  return res.status(200).json({ message: "Cool!" });
}
