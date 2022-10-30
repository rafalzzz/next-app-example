import { toast } from "react-toastify";
import { PostgrestError } from "@supabase/supabase-js";

export const displayErrorMessage = ({ message }: PostgrestError) => {
  if (message) {
    toast.error(message);
  } else {
    toast.error("Something went wrong");
  }
};
