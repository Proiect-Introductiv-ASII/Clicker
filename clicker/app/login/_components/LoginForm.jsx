"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });

      if (response.error) {
        setError("Invalid credentials");
        return;
      }

      router.replace("dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="login-form-page">
      <div className="login-form-container form-style">
        <h1 className="login-form-title">Enter Details</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            onChange={(e) => setCredentials({
              ...credentials,
              email: e.target.value
            })}
            type="text"
            placeholder="Email"
            className="login-input"
          />
          <input
            onChange={(e) => setCredentials({
              ...credentials,
              password: e.target.value
            })}
            type="password"
            placeholder="Password"
            className="login-input"
          />
          <button className="login-button">Login</button>

          {error && <div className="error-message">{error}</div>}

          <br />
          <Link href="/register" className="register-link">
              Don&apos;t have an account? Register
            </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
