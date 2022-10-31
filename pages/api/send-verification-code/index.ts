import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  /* let { user, error } = await supabase.auth.signUp({
    phone: "48575865099",
    password: "some-password",
  }); */

  console.log({ _req: _req.body });

  return res.status(200).json({ message: "Cool!" });
}
