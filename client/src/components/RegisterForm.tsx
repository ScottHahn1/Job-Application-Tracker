import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Info } from "lucide-react";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  error: string;
  isError: boolean;
  setPassword: Dispatch<SetStateAction<string>>;
  password: string;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
}

const RegisterForm = ({
  handleSubmit,
  email, 
  setEmail,
  error,
  isError,
  setPassword,
  password,
  confirmPassword,
  setConfirmPassword
}: Props) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            E-mail
          </label>

          <input
            id="email"
            required
            type="email"
            placeholder="example@email.com"
            pattern="[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,6}"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {error.includes("Email") && <p> {error} </p>}
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <div
            onClick={() => setShowPassword(!showPassword)}
            className="flex items-center gap-1"
          >
            {showPassword ? "Hide Password" : "Show Password"}
            
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </div>

          <input
            id="password"
            required
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {password.length < 8 && (
            <p>Password must be at least 8 characters</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            required
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {isError && (
          <div
            className="flex gap-2 mt-3 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
            role="alert"
          >
            <Info className="w-5 h-5" /> 
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="rounded-md cursor-pointer bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;