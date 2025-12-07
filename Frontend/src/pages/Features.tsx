import HomeNav from '../components/shared/HomeNav';
import HomeFooter from '../components/shared/HomeFooter';
import Threads from '../components/ui/Threads';
import {
    Zap,
    Users,
    Bell,
    BarChart3,
    MapPin,
    Shield,
    Vote,
    MessageSquare,
    TrendingUp
} from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Real-time Issue Tracking",
            description: "Report and track local issues instantly. Get updates on resolution progress in real-time."
        },
        {
            icon: <Vote className="w-6 h-6" />,
            title: "Community Voting",
            description: "Upvote issues that matter to you. Help prioritize what gets fixed first in your community."
        },
        {
            icon: <Bell className="w-6 h-6" />,
            title: "Smart Notifications",
            description: "Stay informed with instant notifications when your reported issues are updated or resolved."
        },
        {
            icon: <BarChart3 className="w-6 h-6" />,
            title: "Admin Dashboard",
            description: "Powerful tools for administrators to manage, prioritize, and resolve community issues efficiently."
        },
        {
            icon: <MessageSquare className="w-6 h-6" />,
            title: "Surveys & Feedback",
            description: "Participate in community surveys and provide valuable feedback to improve your city."
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Location-based Reporting",
            description: "Precisely pinpoint issues with city, zone, and area-specific reporting capabilities."
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Community Board",
            description: "See what others are reporting. Discover trending issues and join the conversation."
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Secure & Private",
            description: "Your data is protected with enterprise-grade security and OAuth2 authentication."
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Analytics & Insights",
            description: "Track your reporting history and see the impact you're making in your community."
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <HomeNav />

            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
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
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32 pb-20">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                        Powerful Features
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Everything you need to report, track, and resolve community issues efficiently.
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="relative px-6 pb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group glass-card p-8 rounded-2xl hover:border-violet-500/20 transition-all duration-300"
                            >
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500/10 to-pink-500/10 border border-violet-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-violet-500/20 transition-all duration-300">
                                    <div className="text-violet-400">
                                        {feature.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative px-6 pb-24">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="glass-card p-12 rounded-3xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to make a difference?
                        </h2>
                        <p className="text-slate-400 text-lg mb-8">
                            Join thousands of citizens improving their communities.
                        </p>
                        <a
                            href="/register"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 hover:scale-105"
                        >
                            Get Started for Free →
                        </a>
                    </div>
                </div>
            </section>

            <HomeFooter />
        </div>
    );
};

export default Features;
