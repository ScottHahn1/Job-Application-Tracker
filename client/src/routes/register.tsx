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

  const { mutate, isError } = useMutation({
    mutationFn: async ({ email, password }: PostVariables) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
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

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    mutate({ email, password });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Create Account</h1>

      <p className="text-gray-600 mb-8">
        Sign up to start tracking your job applications.
      </p>
      
      <RegisterForm
        handleSubmit={signUp}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        isError={isError}
        error={error}
      />
    </div>
  )
}
