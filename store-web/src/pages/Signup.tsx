import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Insert new user into customers table
      const { data, error } = await supabase.from("customers").insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: phone,
          password: password,
        },
      ]).select().single();

      if (error) {
        if (error.code === "23505") { 
          setError("This email is already registered.");
        } else {
          setError("Failed to sign up. Please try again.");
        }
        setLoading(false);
        return;
      }

      // Save user session (demo: localStorage)
      localStorage.setItem("user", JSON.stringify(data));

      // Redirect to menu page
      navigate("/menu");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-vanilla-beige">
      <div className="bg-vanilla-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-coffee-brown mb-6 text-center">Sign Up</h1>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-dark-brown mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pistachio-green"
              required
            />
          </div>
          <div>
            <label className="block text-dark-brown mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pistachio-green"
              required
            />
          </div>
          <div>
            <label className="block text-dark-brown mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pistachio-green"
              required
            />
          </div>
          <div>
            <label className="block text-dark-brown mb-1">Phone (Optional)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pistachio-green"
            />
          </div>
          <div>
            <label className="block text-dark-brown mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pistachio-green"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-caramel-gold hover:bg-pistachio-green text-white rounded-lg shadow-md transition-colors duration-300"
          >
            {loading ? "Creating account…" : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center text-dark-brown text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-pistachio-green hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
