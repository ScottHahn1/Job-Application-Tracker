import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  error: string;
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
  setPassword,
  password,
  confirmPassword,
  setConfirmPassword
}: Props) => {
  const [showPassword, setShowPassword] = useState(true);

  const isFormValid =
  password.length >= 8 && password === confirmPassword;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>

        <input
          id="email"
          type="email"
          placeholder="example@email.com"
          pattern="[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,6}"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error.includes("Email") && <p> {error} </p>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>

        <div
          onClick={() => setShowPassword(!showPassword)}
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
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {password.length < 8 && (
          <p>Password must be at least 8 characters</p>
        )}
      </div>

      <div>
        <label htmlFor="confirm">Confirm Password:</label>

        <div
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide Password" : "Show Password"}
          {showPassword ? (
            <FontAwesomeIcon icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon icon={faEye} />
          )}
        </div>

        <input
          id="confirm"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button type='submit' disabled={!isFormValid}>
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;