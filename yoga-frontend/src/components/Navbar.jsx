import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Update state
    setUser(null);
    
    // Redirect to home
    navigate('/');
  };

  return (
    <nav className="bg-emerald-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Daily Yoga</Link>
        
        <div className="flex items-center space-x-6">
         
          
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-emerald-100">Welcome, {user.username}</span>
              <button 
                onClick={handleLogout}
                className="bg-emerald-700 hover:bg-emerald-800 px-4 py-2 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                to="/login"
                className="bg-emerald-700 hover:bg-emerald-800 px-4 py-2 rounded-md transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register"
                className="border border-white hover:bg-emerald-500 px-4 py-2 rounded-md transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;