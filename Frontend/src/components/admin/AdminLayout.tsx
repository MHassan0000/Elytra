import AdminSidebar from './AdminSidebar';
import Navbar from '../shared/Navbar';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    return (
        <div className="min-h-screen bg-slate-50 flex">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
