import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-yoga flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-6xl font-bold text-emerald-700 mb-8">
          Daily Yoga App
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover yoga poses, learn their benefits, and follow curated video instructions 
          designed for mindfulness and strength.
        </p>
        <Link to="/poses">
          <button className="bg-emerald-500 text-white px-8 py-4 rounded-full text-xl font-medium shadow-lg hover:bg-emerald-600 transition-all transform hover:scale-105">
            Start Practicing
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;