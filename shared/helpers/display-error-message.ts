import { toast } from "react-toastify";

export const displayErrorMessage = (error: unknown) => {
  if (error) {
    toast.error(String(error));
  } else {
    toast.error("Something went wrong");
  }
};
