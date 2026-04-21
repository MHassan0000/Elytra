import HomeNav from '../components/shared/HomeNav';
import HomeFooter from '../components/shared/HomeFooter';
import { Link } from 'react-router-dom';
import BlurText from '../components/ui/BlurText';
import Hyperspeed from '../components/ui/Hyperspeed';
import { Rocket, Zap, Wrench } from 'lucide-react';
const Homepage = () => {

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };
  return (
    <div className="min-h-screen w-full bg-black text-white selection:bg-violet-500/30 overflow-x-hidden">
      <HomeNav />

      {/* Hero Section with Hyperspeed Background */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Hyperspeed Background Container - Constrained height */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Hyperspeed Effect */}
          <div className="absolute inset-0 w-full h-full opacity-100">
            <Hyperspeed
              effectOptions={{
                onSpeedUp: () => { },
                onSlowDown: () => { },
                distortion: 'turbulentDistortion',
                length: 400,
                roadWidth: 10,
                islandWidth: 2,
                lanesPerRoad: 4,
                fov: 90,
                fovSpeedUp: 150,
                speedUp: 2,
                carLightsFade: 0.4,
                totalSideLightSticks: 20,
                lightPairsPerRoadWay: 40,
                shoulderLinesWidthPercentage: 0.05,
                brokenLinesWidthPercentage: 0.1,
                brokenLinesLengthPercentage: 0.5,
                lightStickWidth: [0.12, 0.5],
                lightStickHeight: [1.3, 1.7],
                movingAwaySpeed: [60, 80],
                movingCloserSpeed: [-120, -160],
                carLightsLength: [400 * 0.03, 400 * 0.2],
                carLightsRadius: [0.05, 0.14],
                carWidthPercentage: [0.3, 0.5],
                carShiftX: [-0.8, 0.8],
                carFloorSeparation: [0, 5],
                colors: {
                  roadColor: 0x080808,
                  islandColor: 0x0a0a0a,
                  background: 0x000000,
                  shoulderLines: 0xFFFFFF,
                  brokenLines: 0xFFFFFF,
                  leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
                  rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
                  sticks: 0x03B3C3,
                }
              }}
            />
          </div>
          {/* Gradient Fade to Black at Bottom */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-transparent via-70% to-black pointer-events-none" />
        </div>

        {/* Hero Content - Centered with max-width */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 sm:mt-36 md:mt-0">
          <div className="text-center max-w-3xl mx-auto">

            <BlurText
              text="Report issues improve your city."
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 py-2 leading-tight justify-center"
            />

            <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 sm:mb-10 px-4 sm:px-0">
              A platform for citizens to easily report and track local issues, fostering community engagement and efficient problem-solving.
            </p>

            {/* CTA */}
            <div className="flex flex-col items-center gap-4">
              <Link
                to="/register"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-black text-sm sm:text-base font-bold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              >
                Sign up for free <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-16 sm:pb-24 bg-black z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Ready-to-use",
                description: "Start reporting issues immediately. No complicated setup needed."
              },
              {
                icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Seamless scaling",
                description: "Designed to handle traffic from entire cities without breaking a sweat."
              },
              {
                icon: <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Zero maintenance",
                description: "Focus on community improvement, not managing infrastructure."
              }
            ].map((feature, i) => (
              <div key={i} className="group p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#151A25]/50 border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-[#151A25]">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
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
