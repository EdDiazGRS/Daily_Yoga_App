import React from 'react';

const getDifficultyIcon = (level) => {
  switch (level.toLowerCase()) {
    case 'beginner':
      return '🟢 Beginner';
    case 'intermediate':
      return '🟡 Intermediate';
    case 'advanced':
      return '🔴 Advanced';
    default:
      return level;
  }
};

const PoseCard = ({ pose }) => {
  if (!pose) return null;
  
  // Split benefits into an array - handles different formats from the API
  const formatBenefits = (text) => {
    if (!text) return [];
    // Try to split by spaces between benefits (common patterns)
    const potentialBenefits = text.split(/(?:Improves|Strengthens|Builds|Enhances|Energizes|Creates|Increases|Boosts|Stretches|Opens)/g);
    
    if (potentialBenefits.length > 1) {
      // Re-add the split words and filter empty items
      return potentialBenefits.map((item, i) => {
        const prefix = i > 0 ? text.match(/(?:Improves|Strengthens|Builds|Enhances|Energizes|Creates|Increases|Boosts|Stretches|Opens)/g)[i-1] : '';
        return prefix + item;
      }).filter(item => item.trim().length > 0);
    }
    
    // Fallback: try to split by common separators
    return text.split(/(?:\s*\n\s*|\s*\.\s*|\s*,\s*)/).filter(b => b.trim().length > 0);
  };

  const benefitsArray = formatBenefits(pose.benefits);

  return (
    <div className="card animate-fade-in w-full max-w-4xl mx-auto my-8">
      {/* Header */}
      <div className="card-header bg-emerald-50">
        <h2 className="text-4xl font-bold text-emerald-700 text-center">{pose.name}</h2>
        
        <h3 className="text-xl italic text-gray-600 text-center mt-2">{pose.sanskrit_name}</h3>
        
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <div className="px-4 py-2 bg-white rounded-full shadow-sm">
            {getDifficultyIcon(pose.difficulty)}&nbsp;
          </div>
          
          <div className="px-4 py-2 bg-white rounded-full shadow-sm">
            <span><strong> Type: </strong>{pose.pose_type}&nbsp;</span>
          </div>
          
          <div className="px-4 py-2 bg-white rounded-full shadow-sm">
            <span><strong> Duration: </strong>{pose.duration}</span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="card-body border-b border-gray-100">
        <div className="section">
          <div className="section-title">
            <div className="section-icon bg-emerald-100">
              <span className="text-xl">🧾</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-800">Instructions</h4>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <ol className="instructions-list">
              {pose.instructions && pose.instructions.split('\n')
                .filter(line => line.trim() !== '')
                .map((instruction, index) => (
                  <li key={index} className="text-gray-700">{instruction}</li>
                ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="card-body border-b border-gray-100">
        <div className="section">
          <div className="section-title">
            <div className="section-icon bg-emerald-100">
              <span className="text-xl">🌿</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-800">Benefits</h4>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="flex flex-wrap gap-2 justify-center ">
              {benefitsArray.map((benefit, index) => (
                <div key={index} className="benefit-pill">
                  {benefit.trim()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video */}
      {pose.video && (
        <div className="card-body">
          <div className="section">
            <div className="section-title">
              <div className="section-icon bg-emerald-100">
                <span className="text-xl">🎥</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800">Instructional Video</h4>
            </div>
            
            <div className="video-container">
              <iframe
                src={`https://www.youtube.com/embed/${pose.video.video_id}`}
                title={pose.video.title || "Yoga Instruction Video"}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoseCard;