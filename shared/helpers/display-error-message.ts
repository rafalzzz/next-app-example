import { toast } from "react-toastify";
import axios from "axios";

export const displayErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
    const { message } = error.response.data;
    toast.error(message);
  } else {
    toast.error("Something went wrong");
  }
};
