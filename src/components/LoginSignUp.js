import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import './LoginSignUp.css';
function LoginSignUp() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const handleToggle = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setName('');
    setError('');
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if email ends with '@navgurukul.org'
    if (!email.endsWith('@navgurukul.org')) {
      setError('Email must end with @navgurukul.org');
      return;
    }
    if (isLogin) {
      console.log('Login:', { email, password });
      alert('Login Successful');
      navigate('/campus');
    } else {
      console.log('Sign Up:', { name, email, password });
      alert('Sign Up Successful');
      navigate('/campus');
    }
  };
  return (
    <div className="form-container">
      <Header />
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        {!isLogin && (
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isLogin}
            />
          </div>
        )}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span onClick={handleToggle}>
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </form>
      <Footer />
    </div>
  );
}
export default LoginSignUp;