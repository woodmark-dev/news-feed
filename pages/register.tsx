import { useState, useEffect } from "react";
import NextLink from "next/link";
import AuthWrapper from "@/components/authWrapper";
import { fetcher } from "@/lib/lib";

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function emptyEntries() {
    setFirstName("");
    setLastname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setDepartment("");
  }

  async function action(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");
    if (
      !firstName ||
      !lastName ||
      !email ||
      !department ||
      !password ||
      !confirmPassword
    ) {
      setError("Please enter all details");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    const state = {
      firstName,
      lastName,
      email: email.toLocaleLowerCase(),
      department,
      password,
    };

    setLoading(true);
    const result = await fetcher("auth/register", state);
    if (result.statusCode !== 201) {
      setLoading(false);
      setError(result.message);
      return;
    }
    emptyEntries();
    setSuccess(result.message);
    setLoading(false);
  }

  return (
    <AuthWrapper
      header="Register"
      title="Enter your details below"
      query="Already have an account?"
      queryLink="/login"
      queryTitle="Login"
      action={action}
      loading={loading}
    >
      <input
        type="text"
        placeholder="Enter First Name"
        className="input w-full"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <input
        type="text"
        placeholder="Enter Last Name"
        className="input w-full mt-5"
        onChange={(e) => setLastname(e.target.value)}
        value={lastName}
      />
      <input
        type="email"
        placeholder="Enter email"
        className="input w-full mt-5"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="text"
        placeholder="Department"
        className="input w-full mt-5"
        onChange={(e) => setDepartment(e.target.value)}
        value={department}
      />
      <input
        type="password"
        placeholder="Enter password"
        className="input w-full mt-5"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <input
        type="password"
        placeholder="Comfirm password"
        className="input w-full mt-5"
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
      />
      {error && <p className="mt-5 text-center text-red-400">{error}</p>}
      {success && (
        <p className="mt-5 text-center text-green-400">
          {success}
          <NextLink
            href="/login"
            className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
          >
            Login
          </NextLink>
        </p>
      )}
    </AuthWrapper>
  );
}

Register.prototype.authPage = true;
