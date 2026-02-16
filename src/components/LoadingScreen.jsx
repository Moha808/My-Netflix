// LoadingScreen - full-screen Netflix loading animation
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[200] bg-netflix-black flex items-center justify-center">
      <div className="text-center">
        {/* Netflix Logo */}
        <h1 className="text-netflix-red text-5xl md:text-7xl font-extrabold tracking-wider mb-8 animate-pulse">
          NETFLIX
        </h1>
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-netflix-red border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    </div>
  );
};

export default LoadingScreen;
