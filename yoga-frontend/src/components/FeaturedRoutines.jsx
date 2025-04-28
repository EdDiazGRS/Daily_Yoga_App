import { useState } from 'react';

const FeaturedRoutines = () => {
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  
  const routines = [
    {
      id: 1,
      title: "Morning Flow",
      duration: "10 minutes",
      difficulty: "beginner",
      poses: ["Mountain Pose", "Cat-Cow Stretch", "Downward Dog", "Child's Pose"]
    },
    {
      id: 2,
      title: "Power Yoga",
      duration: "20 minutes",
      difficulty: "intermediate",
      poses: ["Sun Salutations", "Warrior Sequence", "Balance Poses", "Core Work"]
    },
    {
      id: 3,
      title: "Advanced Flow",
      duration: "30 minutes",
      difficulty: "advanced",
      poses: ["Inversions", "Arm Balances", "Deep Stretches", "Meditation"]
    },
    {
      id: 4,
      title: "Gentle Stretch",
      duration: "15 minutes",
      difficulty: "beginner",
      poses: ["Seated Forward Bend", "Butterfly Pose", "Reclined Twist", "Corpse Pose"]
    },
    {
      id: 5,
      title: "Core Strength",
      duration: "25 minutes",
      difficulty: "intermediate",
      poses: ["Boat Pose", "Plank Variations", "Side Plank", "Bridge Pose"]
    }
  ];
  
  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return '🟢';
      case 'intermediate':
        return '🟡';
      case 'advanced':
        return '🔴';
      default:
        return '⚪';
    }
  };
  
  const filteredRoutines = difficultyFilter === 'all'
    ? routines
    : routines.filter(routine => routine.difficulty === difficultyFilter);
  
  return (
    <section className="mb-16 p-8 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Routines</h2>
      
      <div className="difficulty-filter mb-8">
        <label className="mr-2">Filter by difficulty:</label>
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="py-2 px-4 ml-2 border border-gray-300 rounded-md"
        >
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      
      <div className="routine-grid grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
        {filteredRoutines.map(routine => (
          <div 
            key={routine.id} 
            className="routine-card p-6 border border-gray-200 rounded-lg hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out "
            data-difficulty={routine.difficulty}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2 ">{routine.title}</h3>
            <p className="text-gray-600 mb-4">{routine.duration} • {getDifficultyIcon(routine.difficulty)} {routine.difficulty.charAt(0).toUpperCase() + routine.difficulty.slice(1)}</p>
            
            <ul className="mt-4">
              {routine.poses.map((pose, index) => (
                <li 
                  key={index} 
                  className={`py-2 ${index !== routine.poses.length - 1 ? '' : ''}`}
                >
                  {pose}
                </li>
              ))}
            </ul>
            
            <div className="mt-4 text-right">
              <button className="bg-emerald-400 text-gray-800 hover:bg-emerald-500 py-2 px-4 rounded-md transition-colors duration-300">
                Start Routine
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRoutines;