const PortfolioSkeleton = () => {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex flex-col items-center animate-pulse">
          <div
            className="w-full h-[220px] md:h-[260px]
            bg-white/40 rounded-t-full
            shadow-[0_25px_60px_rgba(0,0,0,0.18)]"
          />
          <div className="mt-5 h-3 w-24 bg-[#6F7F86]/30 rounded" />
        </div>
      ))}
    </>
  );
};

export default PortfolioSkeleton;
