import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Building2, FileText, Users, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const features = [
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Digital Requisition Management",
            description: "Streamline the entire requisition process from submission to approval"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Department Collaboration",
            description: "Enable seamless communication between departments and stakeholders"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Secure & Compliant",
            description: "Government-grade security with audit trails and compliance tracking"
        },
        {
            icon: <CheckCircle className="w-6 h-6" />,
            title: "Real-time Tracking",
            description: "Monitor requisition status and progress in real-time"
        }
    ];

    return (
        <>
            <Head title="Shurugwi Town Council - Requisition Tracking System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                                    <Building2 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">Shurugwi Town Council</h1>
                                    <p className="text-sm text-gray-600">Government of Zimbabwe</p>
                                </div>
                            </div>
                            
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link href={route('dashboard')}>
                                        <Button className="bg-blue-600 hover:bg-blue-700">
                                            Dashboard
                                        </Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('login')}>
                                            <Button variant="outline">Sign In</Button>
                                        </Link>
                                        <Link href={route('register')}>
                                            <Button className="bg-blue-600 hover:bg-blue-700">
                                                Get Started
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Modern Requisition
                            <span className="text-blue-600"> Tracking System</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Transform your manual requisition processes into a digital, efficient, and transparent system. 
                            Streamline operations for Shurugwi Town Council with our comprehensive tracking solution.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {!auth.user && (
                                <>
                                    <Link href={route('login')}>
                                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                            Access System
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                    <Link href={route('register')}>
                                        <Button size="lg" variant="outline">
                                            Learn More
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                                    <div className="text-blue-600">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Benefits Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Why Choose Our System?
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Our requisition tracking system is designed specifically for government institutions, 
                                ensuring compliance, transparency, and efficiency in all procurement processes.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">90%</div>
                                <div className="text-sm text-gray-600">Faster Processing</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                                <div className="text-sm text-gray-600">Audit Compliant</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                                <div className="text-sm text-gray-600">System Availability</div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    {!auth.user && (
                        <div className="text-center bg-blue-600 rounded-lg p-8 text-white">
                            <h2 className="text-2xl font-bold mb-4">
                                Ready to Get Started?
                            </h2>
                            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                                Join Shurugwi Town Council in modernizing our requisition processes. 
                                Contact your department administrator for access credentials.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href={route('login')}>
                                    <Button size="lg" variant="secondary">
                                        Sign In Now
                                    </Button>
                                </Link>
                                <Link href={route('register')}>
                                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                                        Request Access
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </main>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <Building2 className="w-6 h-6" />
                                <span className="text-lg font-semibold">Shurugwi Town Council</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                © 2024 Shurugwi Town Council. All rights reserved. | Government of Zimbabwe
                            </p>
                            <p className="text-gray-500 text-xs mt-2">
                                For technical support, contact the IT Department
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
