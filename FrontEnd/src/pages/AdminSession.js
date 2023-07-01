import AdminSession from "../components/AdminSession/AdminSession"
import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin"

function AdminSessionPage() {
    return (
        <div className = 'Admin'>
            <HeaderAdmin/>
            <AdminSession/>
        </div>
    );
}

export default AdminSessionPage;