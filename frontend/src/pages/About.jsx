import TechGlobe from '@/animation/TechGlobe';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          ALL <span className='text-green-500 animate animate-pulse'>About</span> DecisionHub
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          Empowering analysts and decision-makers with a revolutionary no-code platform that simplifies complex decision strategy creation, management, and optimization.
        </p>
      </section>

      {/* Mission Section */}
      <section className="grid md:grid-cols-2 gap-12 mb-16 items-center">
        <div className='bg-card shadow-md bg-gray-900/50 p-6 md:p-8 rounded-2xl backdrop-blur-sm hover:backdrop-blur-lg transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20'>
          <h2 className="text-5xl font-bold text-white md:text-3xl mb-4 hover:text-green-500 transition-colors">Our Mission</h2>
          <p className="text-lg text-gray-300 mb-6">
            DecisionHub was born from a fundamental belief: decision-making should be accessible, transparent, and powerful for everyone, regardless of technical expertise.
            We aim to democratize complex decision strategy development by providing an intuitive, no-code platform that bridges the gap between business logic and technological implementation.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <Check className="text-green-600 mr-3 flex-shrink-0" />
              <span className="text-gray-400 hover:text-white ">Simplify complex decision workflows</span>
            </div>
            <div className="flex items-center">
              <Check className="text-green-600 mr-3 flex-shrink-0" />
              <span className="text-gray-400 hover:text-white">Reduce dependency on technical teams</span>
            </div>
            <div className="flex items-center">
              <Check className="text-green-600 mr-3 flex-shrink-0" />
              <span className="text-gray-400 hover:text-white">Accelerate strategy implementation</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <TechGlobe/>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl text-center text-gray-400 mb-12 ext-3xl sm:text-4xl md:text-5xl font-bold font-heading">Our <span className='text-green-500 animate animate-pulse'>Key</span> Features*</h2>
        <div className="grid md:grid-cols-3 gap-8 ">
          <Card className="bg-card backdrop-blur-sm hover:backdrop-blur-lg transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-300">
                <span className="text-green-600 mr-3">01</span> Rule Builder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Intuitive drag-and-drop interface to create complex decision rules without writing a single line of code. Visualize and design your strategy with ease.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card backdrop-blur-sm hover:backdrop-blur-lg transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-300">
                <span className="text-green-600 mr-3">02</span> Rule Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Centralized dashboard to organize, version, and track all your decision strategies. Effortlessly manage and update rules across your organization.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card backdrop-blur-sm hover:backdrop-blur-lg transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-300">
                <span className="text-green-600 mr-3">03</span> Debugger
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Advanced debugging tools to test, simulate, and validate your decision strategies before deployment. Ensure accuracy and performance.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-card p-12 text-center bg-gradient-to-br from-green-500/20 to-transparent rounded-lg animate-pulse">
        <h2 className="text-3xl font-bold text-gray-200 mb-6">Ready to Transform Your Decision-Making?</h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
          Join DecisionHub and unlock the power of no-code decision strategy development. Empower your team, accelerate your workflows, and make smarter decisions faster.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Start Free Trial
          </button>
          <button className="px-8 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
            Request Demo
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;