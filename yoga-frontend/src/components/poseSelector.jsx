import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PoseCard from "./poseCard";
import FeaturedRoutines from "./FeaturedRoutines"; // Make sure this import path is correct

const PoseSelector = () => {
  const [poses, setPoses] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [poseDetails, setPoseDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFeaturedRoutines, setShowFeaturedRoutines] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/poses/')
      .then(response => setPoses(response.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (!selectedSlug) return;

    setLoading(true);
    setShowFeaturedRoutines(false);
    
    axios.get(`http://localhost:8000/api/poses/${selectedSlug}/`)
      .then(response => {
        setPoseDetails(response.data);
        window.scrollTo(0, 0);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedSlug]);

  const handleBack = () => {
    setSelectedSlug('');
    setPoseDetails(null);
    setShowFeaturedRoutines(true);
  };

  return (
    <div className="min-h-screen bg-gradient-yoga">
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="text-center mb-6">
          <Link to="/" className="text-emerald-600 hover:text-emerald-700 inline-block">
            ← Back to Home
          </Link>
        </div>

        {/* Pose Selector Dropdown */}
        <div className="w-lg text-center max-w-xs mx-auto mb-8">
          <select
            onChange={(e) => setSelectedSlug(e.target.value)}
            value={selectedSlug}
            className="w-lg text-center py-2 px-4 border border-gray-300 rounded-md"
          >
            <option value="">Select a Pose...</option>
            {poses.map(pose => (
              <option key={pose.slug} value={pose.slug}>
                {pose.name}
              </option>
            ))}
          </select>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center items-center py-6">
            <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Pose Details */}
        {!loading && poseDetails && (
          <>
            <PoseCard pose={poseDetails} />
            <div className="text-center mt-6 mb-8">
              <button 
                onClick={handleBack}
                className="text-emerald-600 hover:text-emerald-700 underline"
              >
                ← Back to all poses
              </button>
            </div>
          </>
        )}
        
        {/* No Results Message */}
        {!loading && selectedSlug && !poseDetails && (
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto text-center">
            <p className="text-lg text-gray-600">No details found for this pose.</p>
          </div>
        )}
        
        {/* Featured Routines Section */}
        {showFeaturedRoutines && !loading && !poseDetails && (
          <FeaturedRoutines />
        )}
      </div>
    </div>
  );
};

export default PoseSelector;