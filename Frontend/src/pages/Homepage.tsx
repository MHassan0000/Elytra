import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center animate-fadeIn">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-5xl">
            ✈️
          </div>
        </div>

        {/* Hero Content */}
        <h1 className="text-6xl font-bold text-white mb-4">
          Welcome to <span className="gradient-text">Elytra</span>
        </h1>
        <p className="text-2xl text-gray-300 mb-8">
          City Management Survey System
        </p>
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          Report issues, share feedback, and help improve your city. Join your community
          in making a difference by participating in city management surveys and tracking
          the resolution of local problems.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card">
            <span className="text-4xl mb-3 block">📝</span>
            <h3 className="text-xl font-bold text-white mb-2">Submit Feedback</h3>
            <p className="text-sm text-gray-400">
              Report issues and suggest improvements for your area
            </p>
          </div>
          <div className="card">
            <span className="text-4xl mb-3 block">👥</span>
            <h3 className="text-xl font-bold text-white mb-2">Community Board</h3>
            <p className="text-sm text-gray-400">
              View and upvote issues reported by other residents
            </p>
          </div>
          <div className="card">
            <span className="text-4xl mb-3 block">📊</span>
            <h3 className="text-xl font-bold text-white mb-2">Track Progress</h3>
            <p className="text-sm text-gray-400">
              Monitor the status of reported issues and resolutions
            </p>
          </div>
        </div>

        {/* CTA */}
        <Link
          to="/dashboard"
          className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-lg"
        >
          <span>Enter Dashboard</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;