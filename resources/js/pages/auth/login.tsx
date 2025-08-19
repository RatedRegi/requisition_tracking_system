import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, Building2, Shield } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    return (
        <AuthLayout 
            title="Welcome to Shurugwi Town Council" 
            description="Access the Requisition Tracking System"
        >
            <Head title="Login - Shurugwi Town Council" />

            <div className="mb-6 text-center">
                <div className="flex justify-center mb-4">
                    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
                        <Building2 className="w-8 h-8 text-blue-600" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Requisition Tracking System</h2>
                <p className="text-sm text-gray-600">Shurugwi Town Council</p>
            </div>

            <Form method="post" action={route('login')} onSubmitComplete={(form) => form.reset('password')} className="flex flex-col gap-6">
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="Enter your email address"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {canResetPassword && (
                                        <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox id="remember" name="remember" tabIndex={3} />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>

                            <Button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                {processing ? 'Signing in...' : 'Sign In'}
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Shield className="w-4 h-4" />
                                <span>Secure access to council systems</span>
                            </div>
                            <p className="text-xs text-gray-500">
                                For technical support, contact the IT department
                            </p>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600 bg-green-50 p-3 rounded-md">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
