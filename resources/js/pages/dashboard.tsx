import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { 
    FileText, 
    Clock, 
    CheckCircle, 
    AlertCircle, 
    Plus, 
    Search, 
    Filter,
    TrendingUp,
    Users,
    Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    // Mock data for demonstration
    const stats = {
        totalRequisitions: 156,
        pendingRequisitions: 23,
        approvedRequisitions: 98,
        rejectedRequisitions: 35,
        thisMonth: 45,
        lastMonth: 38
    };

    const recentRequisitions = [
        { id: 'REQ-001', title: 'Office Supplies', department: 'Administration', status: 'pending', date: '2024-01-15' },
        { id: 'REQ-002', title: 'Road Maintenance Equipment', department: 'Public Works', status: 'approved', date: '2024-01-14' },
        { id: 'REQ-003', title: 'Water Treatment Chemicals', department: 'Water & Sanitation', status: 'rejected', date: '2024-01-13' },
        { id: 'REQ-004', title: 'Street Lighting Materials', department: 'Engineering', status: 'pending', date: '2024-01-12' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'text-green-600 bg-green-100';
            case 'rejected': return 'text-red-600 bg-red-100';
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved': return <CheckCircle className="w-4 h-4" />;
            case 'rejected': return <AlertCircle className="w-4 h-4" />;
            case 'pending': return <Clock className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - Shurugwi Town Council" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Requisition Dashboard</h1>
                        <p className="text-gray-600">Shurugwi Town Council Management System</p>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        New Requisition
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Requisitions</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalRequisitions}</div>
                            <p className="text-xs text-muted-foreground">
                                +{stats.thisMonth - stats.lastMonth} from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{stats.pendingRequisitions}</div>
                            <p className="text-xs text-muted-foreground">
                                Awaiting approval
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Approved</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.approvedRequisitions}</div>
                            <p className="text-xs text-muted-foreground">
                                Successfully processed
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                            <AlertCircle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.rejectedRequisitions}</div>
                            <p className="text-xs text-muted-foreground">
                                Requires revision
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Search className="w-5 h-5" />
                                Search Requisitions
                            </CardTitle>
                            <CardDescription>
                                Find specific requisitions by ID, department, or status
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full">
                                <Search className="w-4 h-4 mr-2" />
                                Search
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Filter className="w-5 h-5" />
                                Filter & Reports
                            </CardTitle>
                            <CardDescription>
                                Generate reports and filter by various criteria
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full">
                                <TrendingUp className="w-4 h-4 mr-2" />
                                View Reports
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                Department Overview
                            </CardTitle>
                            <CardDescription>
                                View requisitions by department
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full">
                                <Building2 className="w-4 h-4 mr-2" />
                                Departments
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Requisitions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Requisitions</CardTitle>
                        <CardDescription>
                            Latest requisition requests and their status
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentRequisitions.map((req) => (
                                <div key={req.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-full ${getStatusColor(req.status)}`}>
                                            {getStatusIcon(req.status)}
                                        </div>
                                        <div>
                                            <h4 className="font-medium">{req.title}</h4>
                                            <p className="text-sm text-gray-600">{req.department}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">{req.id}</p>
                                        <p className="text-xs text-gray-500">{req.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <Button variant="outline">View All Requisitions</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
