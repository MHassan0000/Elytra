import HomeNav from '../components/shared/HomeNav';
import HomeFooter from '../components/shared/HomeFooter';
import {
    FileText,
    Shield,
    Mail,
    ExternalLink,
    Download,
    BookOpen,
    MessageCircle
} from 'lucide-react';

const Resources = () => {
    const resources = [
        {
            icon: <BookOpen className="w-6 h-6" />,
            title: "Community Guidelines",
            description: "Learn about our community standards and best practices for reporting issues.",
            link: "#guidelines",
            type: "internal"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Privacy Policy",
            description: "Understand how we protect and handle your personal data.",
            link: "#privacy",
            type: "internal"
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Terms of Service",
            description: "Read our terms and conditions for using the Elytra platform.",
            link: "#terms",
            type: "internal"
        },
        {
            icon: <MessageCircle className="w-6 h-6" />,
            title: "Support & Help",
            description: "Get assistance with any questions or issues you're experiencing.",
            link: "#support",
            type: "internal"
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Contact Us",
            description: "Reach out to our team for partnerships, feedback, or inquiries.",
            link: "mailto:support@elytra.com",
            type: "external"
        },
        {
            icon: <Download className="w-6 h-6" />,
            title: "User Guide PDF",
            description: "Download a comprehensive guide to using all features of Elytra.",
            link: "#download",
            type: "download"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <HomeNav />

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 pt-32 pb-16">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                        Resources
                    </h1>
                    <p className="text-xl text-slate-400">
                        Everything you need to get the most out of Elytra
                    </p>
                </div>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {resources.map((resource, index) => (
                        <a
                            key={index}
                            href={resource.link}
                            className="group glass-card p-8 rounded-2xl hover:border-violet-500/30 transition-all duration-300 block"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500/10 to-pink-500/10 border border-violet-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-violet-500/20 transition-all duration-300">
                                <div className="text-violet-400">
                                    {resource.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-xl font-bold text-white">
                                    {resource.title}
                                </h3>
                                {resource.type === 'external' && (
                                    <ExternalLink className="text-slate-400 flex-shrink-0" size={18} />
                                )}
                            </div>
                            <p className="text-slate-400 leading-relaxed">
                                {resource.description}
                            </p>
                        </a>
                    ))}
                </div>

                {/* Detailed Sections */}
                <div className="space-y-12">
                    {/* Community Guidelines */}
                    <div id="guidelines" className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold mb-6">Community Guidelines</h2>
                        <div className="space-y-4 text-slate-400">
                            <p>Our community thrives on respectful and constructive participation. Please follow these guidelines:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Be respectful and courteous to all community members</li>
                                <li>Report genuine issues with accurate information</li>
                                <li>Avoid duplicate reports - check existing issues first</li>
                                <li>Use appropriate language and tone</li>
                                <li>Respect privacy - don't share personal information of others</li>
                                <li>Vote responsibly on issues that matter to you</li>
                            </ul>
                        </div>
                    </div>

                    {/* Privacy Policy */}
                    <div id="privacy" className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold mb-6">Privacy Policy</h2>
                        <div className="space-y-4 text-slate-400">
                            <p>Your privacy is important to us. Here's how we protect your data:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>We use OAuth2 authentication for secure login</li>
                                <li>Personal data is encrypted and stored securely</li>
                                <li>We never sell your information to third parties</li>
                                <li>You can delete your account and data at any time</li>
                                <li>Cookies are used only for essential functionality</li>
                                <li>Issue reports may be visible to other users and admins</li>
                            </ul>
                        </div>
                    </div>

                    {/* Terms of Service */}
                    <div id="terms" className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold mb-6">Terms of Service</h2>
                        <div className="space-y-4 text-slate-400">
                            <p>By using Elytra, you agree to the following terms:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>You must be at least 13 years old to use this service</li>
                                <li>You are responsible for maintaining account security</li>
                                <li>Misuse of the platform may result in account suspension</li>
                                <li>We reserve the right to remove inappropriate content</li>
                                <li>The service is provided "as is" without warranties</li>
                                <li>We may update these terms with notice to users</li>
                            </ul>
                        </div>
                    </div>

                    {/* Support */}
                    <div id="support" className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold mb-6">Support & Help</h2>
                        <div className="space-y-4 text-slate-400">
                            <p>Need help? We're here for you:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                                    <h3 className="text-white font-bold mb-2">Documentation</h3>
                                    <p className="text-sm mb-4">Check our comprehensive docs for guides and tutorials.</p>
                                    <a href="/docs" className="text-violet-400 hover:text-violet-300 text-sm font-medium">
                                        View Docs →
                                    </a>
                                </div>
                                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                                    <h3 className="text-white font-bold mb-2">Email Support</h3>
                                    <p className="text-sm mb-4">Send us an email and we'll respond within 24 hours.</p>
                                    <a href="mailto:support@elytra.com" className="text-violet-400 hover:text-violet-300 text-sm font-medium">
                                        support@elytra.com →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <HomeFooter />
        </div>
    );
};

export default Resources;
