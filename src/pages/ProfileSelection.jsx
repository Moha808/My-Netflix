// Profile Selection Page - Netflix-style profile picker
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaPen } from "react-icons/fa";
import { motion } from "framer-motion";

// Profile avatar colors for visual variety
const PROFILE_COLORS = ["#E50914", "#1CE783", "#5EBAFF", "#BF94FF", "#FFB800"];

const PROFILES = [
  {
    id: 1,
    name: "User",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
  },
  {
    id: 2,
    name: "Kids",
    avatar:
      "https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxga/AAAABTZ2CIbzSNb_vMPNmCnhR_DELETED_ODNPLk1v1QYyf_t-gTS39UIGxJg3RMdzl3SGq1h5.png?r=229",
    color: PROFILE_COLORS[3],
  },
  { id: 3, name: "Guest", color: PROFILE_COLORS[1] },
];

const ProfileSelection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleProfileSelect = () => {
    navigate("/");
  };

  // Animation variants for staggered entrance
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-netflix-black flex items-center justify-center px-4">
      <div className="text-center">
        {/* Title */}
        <h1 className="text-white text-3xl md:text-5xl font-medium mb-8 md:mb-12">
          Who&apos;s watching?
        </h1>

        {/* Profile Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-10"
        >
          {/* Main Profile from authenticated user */}
          <motion.button
            variants={item}
            onClick={handleProfileSelect}
            className="group flex flex-col items-center gap-3 cursor-pointer"
          >
            <div className="relative w-24 h-24 md:w-36 md:h-36 rounded overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-200">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt={user?.displayName || "User"}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-netflix-light-gray text-sm md:text-base group-hover:text-white transition-colors">
              {user?.displayName || "User"}
            </span>
          </motion.button>

          {/* Kids Profile */}
          <motion.button
            variants={item}
            onClick={handleProfileSelect}
            className="group flex flex-col items-center gap-3 cursor-pointer"
          >
            <div className="relative w-24 h-24 md:w-36 md:h-36 rounded overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-200 bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
              <span className="text-4xl md:text-5xl">👶</span>
            </div>
            <span className="text-netflix-light-gray text-sm md:text-base group-hover:text-white transition-colors">
              Kids
            </span>
          </motion.button>

          {/* Add Profile */}
          <motion.button
            variants={item}
            className="group flex flex-col items-center gap-3 cursor-pointer"
          >
            <div className="w-24 h-24 md:w-36 md:h-36 rounded overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-200 bg-netflix-gray/50 flex items-center justify-center">
              <span className="text-netflix-light-gray text-5xl md:text-6xl font-light group-hover:text-white transition-colors">
                +
              </span>
            </div>
            <span className="text-netflix-light-gray text-sm md:text-base group-hover:text-white transition-colors">
              Add Profile
            </span>
          </motion.button>
        </motion.div>

        {/* Manage Profiles Button */}
        <button className="text-netflix-light-gray text-sm md:text-base border border-netflix-light-gray px-6 py-2 hover:text-white hover:border-white transition-colors flex items-center gap-2 mx-auto">
          <FaPen className="text-xs" />
          Manage Profiles
        </button>
      </div>
    </div>
  );
};

export default ProfileSelection;
