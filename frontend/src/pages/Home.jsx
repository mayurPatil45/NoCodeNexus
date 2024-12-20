import { Button } from '@/components/ui/button';
import {
    StickyNoteIcon,
    Users,
    FolderSyncIcon,
    Presentation,
    Zap,
    FolderClock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FAQSection from './FAQSections';

const Hero = () => {
    const navigate = useNavigate();

    const handleSignupClick = () => navigate('/signup');

    return (
        <>
            {/* Hero Section */}
            <section className="container mx-auto px-4 mb-32 md:mt-36 w-full h-full">
                <div className="text-center">
                    <h1 className="text-xl md:text-8xl font-bold text-gray-500 mb-4">
                        <span className="text-primary text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500 transition-colors duration-500 break-words">NoCodeNexus</span>
                    </h1>
                    <p className='text-xl text-gray-400 my-2 font-heading bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent hover:from-gray-500 hover:to-white transition-all duration-500'>
                            User-friendly no-code platform for efficient decision strategies.

                    </p>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Decision Hub is a holistic solution, featuring Rule Builder, Rule Management, and Debugger sections, providing a user-centric, no-code platform for analysts to effortlessly create, manage, and test decision strategies.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Button
                            onClick={handleSignupClick}
                            size="lg"
                            className="text-gray-800 bg-green-600 hover:bg-green-700 hover:text-black"
                        >
                            Sign Up
                        </Button>
                        <Button size="lg" variant="outline">
                            Learn More
                        </Button>
                    </div>
                </div>
            </section>

            {/* Card Section */}
            <section id="features" className="mt-24 text-center px-24 py-16">
                <h2 className="text-white text-6xl font-bold mb-12">Start <span className=''>building</span> today</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </section>
            
            {/* FAQ Section */}
            <section className="mt-24 text-center py-20 px-40">
                <h2 className="text-6xl font-semibold mb-12 px-10 text-white ">
                Frequently <span className='text-green-500 animate animate-pulse'>Asked</span> Question
                </h2>
                <FAQSection/>
            </section>

            {/* Highlight Section */}
            <section className="mt-24 text-center py-20 px-40">
                <h2 className="text-7xl font-semibold mb-12 px-10 text-white ">
                    Generate and explain optimized <span className='text-green-500 hover:text-white transition-colors duration-300'>SQL</span> queries using AI! Improve your skills and save time...
                </h2>
            </section>
        </>
    );
};

const features = [
    {
        icon: StickyNoteIcon,
        title: "No-code rules",
        description:
            "Rule Builder: No-code, intuitive interface, integrates LLM for transforming plain text into actionable queries, simplifying technological complexities.",
    },
    {
        icon: Users,
        title: "Excel-Like Logic Support",
        description:
            "Our app eases Business Analysts' transition by allowing Excel-like logic, converting arithmetic expressions into rules for seamless familiarity.",
    },
    {
        icon: FolderSyncIcon,
        title: "Modification | Testing",
        description:
            "DecisionHub enables analysts to swiftly modify and test decision strategies, offering a user-friendly interface for real-time adjustments, reducing errors amid evolving business requirements.",
    },
    {
        icon: Presentation,
        title: "Efficient Logic Checking",
        description:
            "Our app simplifies managing numerous rules with a user-friendly interface for swift logic checks, allowing quick identification of potential issues.",
    },
    {
        icon: Zap,
        title: "Visualizer",
        description:
            "DecisionHub enables seamless database uploads, intuitive data visualization, and on-the-fly query execution, empowering users to generate insightful plots and trace data with ease.",
    },
    {
        icon: FolderClock,
        title: "User History",
        description:
            "DecisionHub empowers business analysts to securely save and manage relevant details, providing records of user interactions and data modifications.",
    },
];

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-card shadow-md bg-gray-900/50 p-6 md:p-8 rounded-2xl backdrop-blur-sm hover:backdrop-blur-lg transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20">
        <Icon className="mx-auto text-green-600 hover:text-green-400 mb-4 transform transition-transform hover:rotate-12 hover:scale-110" size={54} />
        <h3 className="text-xl  text-gray-300 font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 hover:text-gray-400 transition">{description}</p>
    </div>
    
);

export default Hero;
