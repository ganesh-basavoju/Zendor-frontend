import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex -mt-7">
        <Sidebar />
        <div className="flex-1  lg:ml-64 p-6 pb-20 lg:pb-6"> {/* Added padding bottom for mobile */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;