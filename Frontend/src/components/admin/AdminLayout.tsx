import AdminSidebar from './AdminSidebar';
import Navbar from '../shared/Navbar';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    return (
        <div className="min-h-screen bg-transparent">
            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]"></div>
            </div>

            <AdminSidebar />
            <Navbar />

            <main className="pt-28 pb-6 px-4 lg:pl-[290px] lg:pr-6 transition-all duration-300">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
