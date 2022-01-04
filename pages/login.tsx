import React from "react";
import { authApi } from "../api-client";

interface LoginPageProps {}

export const LoginPage = (props: LoginPageProps) => {
  async function handleLoginClick() {
    try {
      await authApi.login({ username: "username", password: "123456" });
    } catch (error) {
      console.log("fail to login", error);
    }
  }

  async function handleGetProfileClick() {
    try {
      await authApi.getProfile();
    } catch (error) {
      console.log("fail to get profile", error);
    }
  }

  async function handleLogoutClick() {
    try {
      await authApi.logout();
    } catch (error) {
      console.log("fail to logout", error);
    }
  }

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleGetProfileClick}>Get Profile</button>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};
