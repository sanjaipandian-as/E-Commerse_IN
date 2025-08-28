import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2 } from "react-icons/fi";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) setUser(userInfo);
    else navigate("/login");
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      {/* Header Banner */}
      <div className="relative h-48 bg-gradient-to-r from-orange-500 to-yellow-400 flex-shrink-0">
        <div className="absolute -bottom-12 left-12 flex items-center">
          <div className="w-36 h-36 rounded-full border-4 border-white shadow-2xl bg-orange-200 flex items-center justify-center text-6xl text-white font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div className="ml-6 text-white drop-shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold">{user.name || "Guest User"}</h2>
            <p className="text-lg md:text-xl">{user.role || "Customer"}</p>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="flex-1 bg-gray-100 pt-20 px-10 pb-10 w-full overflow-auto">
        <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 flex items-center gap-3">
          <FiUser className="text-orange-500 text-2xl" /> Profile Information
        </h3>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <ProfileField icon={<FiMail />} label="Email" value={user.email} />
          <ProfileField icon={<FiPhone />} label="Phone" value={user.phone || "Not provided"} />
          <ProfileField icon={<FiMapPin />} label="Address" value={user.address || "Not provided"} />
          <ProfileField icon={<FiUser />} label="Role" value={user.role || "Customer"} />
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap gap-6 justify-end">
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl shadow-lg transition duration-200">
            <FiEdit2 /> Edit Profile
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("userInfo");
              navigate("/login");
            }}
            className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-6 py-3 rounded-2xl shadow transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable field component
function ProfileField({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200">
      <div className="text-orange-500 text-3xl">{icon}</div>
      <div className="flex flex-col">
        <p className="text-sm md:text-base text-gray-500">{label}</p>
        <p className="text-gray-900 font-semibold md:text-lg">{value}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
