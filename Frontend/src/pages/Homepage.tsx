import HomeNav from '../components/shared/HomeNav';
import HomeFooter from '../components/shared/HomeFooter';
import Threads from '../components/ui/Threads';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-violet-500/30">
      <HomeNav />

      {/* Hero Section with Threads Background */}
      <main className="relative min-h-screen max-w-7xl mx-auto px-6 py-24">
        {/* Threads Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-100">
          <Threads
            color={[1, 1, 1]}
            amplitude={1.5}
            distance={0.3}
            enableMouseInteraction={true}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-30">
            Report issues, improve your city.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10">
            A platform for citizens to easily report and track local issues, fostering community engagement and efficient problem-solving.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4">
            <Link
              to="/register"
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              Sign up for free <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🚀",
                title: "Ready-to-use",
                description: "Start reporting issues immediately. No complicated setup needed."
              },
              {
                icon: "⚡",
                title: "Seamless scaling",
                description: "Designed to handle traffic from entire cities without breaking a sweat."
              },
              {
                icon: "🛠️",
                title: "Zero maintenance",
                description: "Focus on community improvement, not managing infrastructure."
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-[#151A25]/50 border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-[#151A25]">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
};

export default Homepage;