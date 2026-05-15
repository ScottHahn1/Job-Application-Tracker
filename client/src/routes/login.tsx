import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import LoginForm from "../components/LoginForm";

interface PostVariables {
  email: string;
  password: string;
};

export const Route = createFileRoute("/login")({
  component: Login
})

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async ({ email, password }: PostVariables) => {
      const response = await fetch("http://localhost:8888/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password})
      })

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return data;
    },
    onSuccess: () => {
      setTimeout(() => navigate({ to: "/" }), 2000);
    },
    onError: (err: Error) => {
      setError(err.message);
    }
  });

   const login = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setError("");

    mutate({ email, password });
  };

  return (
    <div>
      <h2>Login</h2>

      <LoginForm
        handleSubmit={login}
        email={email}
        setEmail={setEmail}
        setShowPassword={setShowPassword}
        showPassword={showPassword}
        password={password}
        setPassword={setPassword}
        error={error}
      />
    </div>
  )
}