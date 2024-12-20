import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSigningUp, setIsSigningUp] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSigningUp) {
      handleSignUp();
    } else {
      handleLogin();
    }
  };

  const handleSignUp = async () => {
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

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google sign-in logic here
    console.log('Signing in with Google');
  };

  const toggleSignUpLogin = () => {
    setIsSigningUp((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">{isSigningUp ? "Welcome to DecisionHub!" : "Welcome Back to DecisionHub!"}</h2>
          <p className="text-gray-500">
            {isSigningUp
              ? "Please sign up to continue"
              : "Please log in to continue"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSigningUp && (
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Your Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {isSigningUp && (
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isSigningUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <img src="google-logo.svg" alt="Google" className="h-5 mr-2" />
            Google
          </button>
          <p className="text-gray-500 mt-2">
            {isSigningUp
              ? "Already Have An Account?"
              : "Don't Have An Account?"}
            <button
              type="button"
              onClick={toggleSignUpLogin}
              className="text-blue-500 hover:underline ml-2"
            >
              {isSigningUp ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;