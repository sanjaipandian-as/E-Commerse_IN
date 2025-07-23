import { AuthProvider } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/user-edit");
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (confirmed) {
      // Example: Call your backend API to delete user
      // For now just log out the user
      // 👉 Replace with real DELETE API request
      alert("Account deleted!");
      logout();
      navigate("/");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">My Profile</h1>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>

      <div className="mt-4 flex gap-4">
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit Profile
        </button>

        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
