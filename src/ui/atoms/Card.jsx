export const Card = ({ children, className, src }) => {
  return (
    <div
      className={`rounded-xl border border-gray-700 p-4 relative overflow-hidden ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt="BG Image"
          className="w-full h-full object-cover absolute top-0 left-0"
        />
      ) : null}
      {children}
    </div>
  );
};

Card.displayName = "Card";
