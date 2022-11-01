import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.SUPABASE_KEY ?? "";

export const encryptPassword = (password: string) =>
  CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
