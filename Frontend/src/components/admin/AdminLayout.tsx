import AdminSidebar from './AdminSidebar';
import Navbar from '../shared/Navbar';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex">
            <AdminSidebar />
            <div className="flex-1 flex flex-col ml-0 lg:ml-64">
                <Navbar />
                <main className="pt-20 px-4 pb-8 sm:px-6 lg:px-10">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
