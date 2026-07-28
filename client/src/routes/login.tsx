import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
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

  const router = useRouter();

  const { mutate, isError } = useMutation({
    mutationFn: async ({ email, password }: PostVariables) => {
      const response = await fetch("http://localhost:8888/api/users/login", {
        method: "POST",
        credentials: "include",
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
    onSuccess: async () => {
      await router.invalidate();
      router.navigate({ to: "/" });
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
      <h1 className="text-3xl font-bold mb-2">Sign In</h1>

      <p className="text-gray-600 mb-8">
        Sign in to your account.
      </p>

      <LoginForm
        handleSubmit={login}
        email={email}
        setEmail={setEmail}
        setShowPassword={setShowPassword}
        showPassword={showPassword}
        password={password}
        setPassword={setPassword}
        isError={isError}
        error={error}
      />
    </div>
  )
}