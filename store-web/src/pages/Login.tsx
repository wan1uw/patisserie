import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('email', email)
        .eq('password', password) // ⚠️ plain-text for demo ONLY
        .single();

      if (error || !data) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }

      // Save user session (for demo: localStorage)
      localStorage.setItem('user', JSON.stringify(data));

      // Redirect to Menu
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-vanilla-beige">
      <div className="bg-vanilla-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-coffee-brown mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
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
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-dark-brown text-sm">
          Don’t have an account?{' '}
          <a href="/signup" className="text-pistachio-green hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
