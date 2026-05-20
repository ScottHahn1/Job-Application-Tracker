import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react';
import RegisterForm from '../components/RegisterForm';

export const Route = createFileRoute("/register")({
  component: Register
})

interface PostVariables {
    email: string;
    password: string;
};

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async ({ email, password }: PostVariables) => {
      const response = await fetch("http://localhost:8888/api/users/register", {
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
      setTimeout(() => navigate({ to: "/login" }), 2000);
    },
    onError: (err: Error) => {
      setError(err.message);
    }
  });

  const signUp = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setError("");

    mutate({ email, password });
  };

  return (
    <RegisterForm 
      handleSubmit={signUp}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      error={error}
    />
  )
}
