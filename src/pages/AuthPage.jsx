import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { useRouterState } from "@tanstack/react-router";

export const AuthPage = () => {
  const routerState = useRouterState();
  const [isLogin, setIsLogin] = useState(!routerState.location.state?.showRegister);

  return (
    <>
      {isLogin ? (
        <LoginForm onSwitchAuth={() => setIsLogin(false)}/>
      ): (
        <RegisterForm onSwitchAuth={() => setIsLogin(true)}/>
      )}
    </>
  )
}