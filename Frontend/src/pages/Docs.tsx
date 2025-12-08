import { useState } from 'react';
import HomeNav from '../components/shared/HomeNav';
import HomeFooter from '../components/shared/HomeFooter';
import { Book, Code, Users, HelpCircle, Search, ChevronRight } from 'lucide-react';

const Docs = () => {
    const [activeSection, setActiveSection] = useState('getting-started');

    const sections = [
        { id: 'getting-started', title: 'Getting Started', icon: <Book className="w-4 h-4" /> },
        { id: 'user-guide', title: 'User Guide', icon: <Users className="w-4 h-4" /> },
        { id: 'admin-guide', title: 'Admin Guide', icon: <Code className="w-4 h-4" /> },
        { id: 'faqs', title: 'FAQs', icon: <HelpCircle className="w-4 h-4" /> },
    ];

    const content = {
        'getting-started': {
            title: 'Getting Started',
            sections: [
                {
                    heading: 'Welcome to Elytra',
                    content: 'Elytra is a community-driven platform that empowers citizens to report and track local issues. Get started in minutes with our simple onboarding process.'
                },
                {
                    heading: 'Create Your Account',
                    content: 'Sign up using your email or OAuth providers (Google, GitHub). Your account gives you access to report issues, vote on community priorities, and track resolution progress.'
                },
                {
                    heading: 'Report Your First Issue',
                    content: 'Navigate to "Submit Feedback" from your dashboard. Fill in the issue details, select your location, and submit. You\'ll receive notifications as your issue progresses.'
                }
            ]
        },
        'user-guide': {
            title: 'User Guide',
            sections: [
                {
                    heading: 'Dashboard Overview',
                    content: 'Your dashboard shows your reported issues, statistics, and recent activity. Track pending, in-progress, and resolved issues at a glance.'
                },
                {
                    heading: 'Community Board',
                    content: 'Browse issues reported by others in your community. Upvote important issues to help prioritize what gets fixed first. Filter by status to find specific types of reports.'
                },
                {
                    heading: 'Notifications',
                    content: 'Stay updated with real-time notifications when admins update your reported issues. Mark notifications as read to keep your inbox organized.'
                },
                {
                    heading: 'Surveys',
                    content: 'Participate in community surveys to provide feedback and help shape local improvements. Your responses are anonymous and valuable.'
                }
            ]
        },
        'admin-guide': {
            title: 'Admin Guide',
            sections: [
                {
                    heading: 'Admin Dashboard',
                    content: 'Access comprehensive analytics, user management, and issue oversight. Monitor community engagement and resolution metrics.'
                },
                {
                    heading: 'Managing Issues',
                    content: 'Update issue statuses (Pending → In Progress → Resolved). Users receive automatic notifications when you update their reports.'
                },
                {
                    heading: 'User Management',
                    content: 'View all registered users, manage roles, and monitor user activity. Ensure community guidelines are followed.'
                },
                {
                    heading: 'Creating Surveys',
                    content: 'Design and publish surveys to gather community feedback. Track response rates and analyze results to inform decisions.'
                }
            ]
        },
        'faqs': {
            title: 'Frequently Asked Questions',
            sections: [
                {
                    heading: 'How do I report an issue?',
                    content: 'Click "Submit Feedback" from your dashboard, fill in the details including title, description, category, and location, then submit. You\'ll receive a confirmation and can track progress.'
                },
                {
                    heading: 'Can I delete my reports?',
                    content: 'Yes! You can delete your own reports from the Community Board or My Reports page. Click the trash icon on any report you created.'
                },
                {
                    heading: 'How does voting work?',
                    content: 'Each user can upvote an issue once. Your vote helps prioritize issues. Click the upvote button again to remove your vote. Vote counts are visible to everyone.'
                },
                {
                    heading: 'What happens after I report an issue?',
                    content: 'Admins review your report and update its status. You\'ll receive notifications at each stage: when it\'s acknowledged, in progress, and when resolved.'
                },
                {
                    heading: 'Is my data secure?',
                    content: 'Yes! We use industry-standard OAuth2 authentication and encrypt all data. Your personal information is never shared without consent.'
                }
            ]
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <HomeNav />

            <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                        Documentation
                    </h1>
                    <p className="text-xl text-slate-400">
                        Everything you need to know about using Elytra
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-12">
                    <div className="relative max-w-2xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search documentation..."
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 transition-colors"
                        />
                    </div>
                </div>

                {/* Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="glass-card p-6 rounded-xl sticky top-24">
                            <nav className="space-y-2">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${activeSection === section.id
                                                ? 'bg-linear-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30 text-white'
                                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {section.icon}
                                        <span className="font-medium">{section.title}</span>
                                        {activeSection === section.id && (
                                            <ChevronRight className="ml-auto" size={16} />
                                        )}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="glass-card p-8 rounded-xl">
                            <h2 className="text-3xl font-bold mb-8">
                                {content[activeSection as keyof typeof content].title}
                            </h2>

                            <div className="space-y-8">
                                {content[activeSection as keyof typeof content].sections.map((section, index) => (
                                    <div key={index} className="border-l-2 border-violet-500/30 pl-6">
                                        <h3 className="text-xl font-bold text-white mb-3">
                                            {section.heading}
                                        </h3>
                                        <p className="text-slate-400 leading-relaxed">
                                            {section.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <HomeFooter />
        </div>
    );
};

export default Docs;
