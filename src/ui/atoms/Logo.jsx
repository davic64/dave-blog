export const Logo = ({ square, className }) => {
  return !square ? (
    <div className={`flex items-center text-2xl ${className}`}>
      <span className="font-bold">Dave</span>
      <span className="font-thin">, Full Stack</span>
    </div>
  ) : (
    <div className="mb-4 relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-slate-400">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-dark px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        <div className={`flex items-center text-2xl ${className}`}>
          <span className="font-bold">Dave</span>
          <span className="font-thin">, Full Stack</span>
        </div>
      </span>
    </div>
  );
};
