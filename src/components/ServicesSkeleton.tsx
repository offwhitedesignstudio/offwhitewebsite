const ServicesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="relative h-[520px] rounded-2xl overflow-hidden
          bg-white/10 backdrop-blur
          animate-pulse"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-white/30 rounded mb-6" />
              <div className="h-6 w-40 bg-white/30 rounded" />
            </div>
            <div className="h-10 w-40 bg-white/40 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesSkeleton;
