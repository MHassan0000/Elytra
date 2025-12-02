import AdminSidebar from './AdminSidebar';
import Navbar from '../shared/Navbar';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    return (
        <div className="min-h-screen bg-slate-950">
            <AdminSidebar />
            <Navbar />
            <main className="ml-64 pt-16">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
