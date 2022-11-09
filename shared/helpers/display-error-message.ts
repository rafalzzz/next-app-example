import { toast } from "react-toastify";

type ResponseError = {
  error: {
    data: {
      message: string;
    };
  };
};

export const displayErrorMessage = (error: unknown, toastId?: string) => {
  if (error) {
    toast.error(
      (error as ResponseError).error?.data?.message || "Internal server error"
    );
  } else {
    toast.error("Something went wrong, please try again", { toastId });
  }
};
