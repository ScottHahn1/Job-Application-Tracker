import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  showPassword: boolean;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  error: string;
}

const LoginForm = ({
  handleSubmit,
  email,
  setEmail,
  setShowPassword,
  showPassword,
  password,
  setPassword,
  error
}: Props) => {
  const isFormValid =
  email.length > 0 && password.length >= 8;

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

      { error }
    
      <button type="submit" disabled={!isFormValid}>
        Login
      </button>
    </form>
  )
}

export default LoginForm;