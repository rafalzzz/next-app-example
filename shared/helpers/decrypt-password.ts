import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.SUPABASE_KEY ?? "";

export const decryptPassword = (encryptedPassword: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
