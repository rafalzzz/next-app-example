import { mockedPushMethod } from "test-utils/mocked-use-router-methods";

export const useRouter = () => ({
  push: mockedPushMethod,
});
