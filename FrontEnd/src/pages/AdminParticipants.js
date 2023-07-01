import AdminParticipants from "../components/AdminParticipants/AdminParticipants"
import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin"

function AdminParticipantsPage() {
    return (
        <div className = 'Admin'>
            <HeaderAdmin/>
            <AdminParticipants/>
        </div>
    );
}

export default AdminParticipantsPage;