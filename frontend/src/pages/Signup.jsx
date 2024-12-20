import { Database } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  const handleClick = () => {
    navigate('/');
  };

  const handleGoogleSignIn = () => {
    // Implement Google sign-in logic here
    console.log('Signing in with Google');
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  return (
    <div className="relative min-h-screen bg-custom flex flex-col">
      {/* Top Navigation */}
      <nav className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
        {/* Logo on Top Left */}
        <div
          className="flex items-center mx-10 p-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClick();
            }
          }}
        >
          <div className="flex items-center">
            <span className="text-3xl font-bold text-primary">NOC</span>
            <Database className="text-5xl text-primary mt-1" />
            <span className="text-3xl font-bold text-primary">DE</span>
            <span className="text-3xl font-bold text-white">NEXUS</span>
          </div>
        </div>
      </nav>

      <div className="flex flex-grow justify-center items-center">
        <div className="bg-card p-8 rounded-2xl w-full max-w-md mx-4 shadow-2xl shadow-green-500/20">
          <div className="text-center mb-6">
            <h2 className="text-gray-200 text-2xl font-bold">Welcome to NoCodeNexus!</h2>
            <p className="text-gray-500">Please sign up to continue</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-400 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-400 font-medium mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-400 font-medium mb-2">
                Your Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-400 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-gray-800 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <img src="google-logo.svg" alt="Google" className="h-5 mr-2" />
              Continue with Google
            </button>
            <p className="text-gray-500 mt-2">
              Already Have An Account?
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-green-500 hover:underline ml-2"
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;