import { authApi } from "./../api-client/auth-api";
import {
  QueryCache,
  useMutation,
  useQuery,
  UseQueryOptions
} from "react-query";
import axios from "axios";
import { LoginPayload } from "models";

export function useAuth(options: UseQueryOptions) {
  return useQuery("/api/profile", () => authApi.getProfile(), {
    refetchOnWindowFocus: false,
    refetchInterval: 60 * 60 * 1000,
    ...options
  });
}

export function useLogin() {
  return useMutation(value => {
    authApi.login(value as LoginPayload);
  });
}
