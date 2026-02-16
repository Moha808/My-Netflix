// Netflix-style Navbar with scroll transparency effect
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSearch, FaBell, FaCaretDown } from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-12 py-3 transition-all duration-500 ${
        isScrolled
          ? "bg-netflix-black/95 shadow-lg"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      {/* Left Section: Logo + Navigation Links */}
      <div className="flex items-center gap-2 md:gap-8">
        {/* Netflix Logo */}
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-netflix-red text-xl md:text-3xl font-extrabold tracking-wider cursor-pointer">
            NETFLIX
          </h1>
        </Link>

        {/* Navigation Links (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            to="/"
            className="text-sm text-netflix-text hover:text-white transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/tv-shows"
            className="text-sm text-netflix-text hover:text-white transition-colors duration-300"
          >
            TV Shows
          </Link>
          <Link
            to="/movies"
            className="text-sm text-netflix-text hover:text-white transition-colors duration-300"
          >
            Movies
          </Link>
          <Link
            to="/new"
            className="text-sm text-netflix-text hover:text-white transition-colors duration-300"
          >
            New & Popular
          </Link>
          <Link
            to="/my-list"
            className="text-sm text-netflix-text hover:text-white transition-colors duration-300"
          >
            My List
          </Link>
        </div>
      </div>

      {/* Right Section: Search, Notifications, Profile */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Search Bar */}
        <div className="relative flex items-center">
          {showSearch && (
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Titles, people, genres"
                autoFocus
                className="bg-netflix-black/90 border border-netflix-light-gray text-white text-sm px-3 py-1.5 w-40 md:w-56 outline-none rounded-sm"
                onBlur={() => {
                  if (!searchQuery) setShowSearch(false);
                }}
              />
            </form>
          )}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-white text-lg hover:text-netflix-text transition-colors ml-2"
          >
            <FaSearch />
          </button>
        </div>

        {/* Notifications */}
        <button className="text-white text-lg hover:text-netflix-text transition-colors hidden md:block">
          <FaBell />
        </button>

        {/* Profile Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button className="flex items-center gap-2 cursor-pointer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="Profile"
              className="w-8 h-8 rounded"
            />
            <FaCaretDown
              className={`text-white text-xs transition-transform duration-300 ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 bg-netflix-black/95 border border-netflix-gray rounded shadow-lg min-w-48 py-2">
              <div className="px-4 py-2 border-b border-netflix-gray">
                <p className="text-white text-sm font-medium truncate">
                  {user?.displayName || user?.email || "User"}
                </p>
              </div>
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-netflix-text hover:text-white hover:bg-netflix-gray/50 transition-colors"
              >
                Manage Profiles
              </Link>
              <Link
                to="/my-list"
                className="block px-4 py-2 text-sm text-netflix-text hover:text-white hover:bg-netflix-gray/50 transition-colors md:hidden"
              >
                My List
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-sm text-netflix-text hover:text-white hover:bg-netflix-gray/50 transition-colors border-t border-netflix-gray mt-1"
              >
                Sign out of Netflix
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
