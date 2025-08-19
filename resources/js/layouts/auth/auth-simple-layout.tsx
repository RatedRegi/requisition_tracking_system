import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { Building2 } from 'lucide-react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-10">
            <div className="w-full max-w-md">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 shadow-lg">
                                <Building2 className="size-8 fill-current text-white" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                            <p className="text-center text-sm text-gray-600">{description}</p>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
                        {children}
                    </div>
                    
                    <div className="text-center text-xs text-gray-500">
                        <p>© 2024 Shurugwi Town Council. All rights reserved.</p>
                        <p className="mt-1">Government of Zimbabwe</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
