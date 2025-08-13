import React from "react";

const Loader2 = () => {
  const size = 2; // 2x2 grid
  const blocks = [];

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const delay = (row * size + col) * 0.15;
      blocks.push(
        <div
          key={`${row}-${col}`}
          className="w-10 h-10 rounded-md"
          style={{
            background: "#144EE3",
            animation: `pulseBlock 1.4s ease-in-out infinite`,
            animationDelay: `${delay}s`,
            boxShadow: "0 0 14px rgba(20, 78, 227, 0.7)", // glow
          }}
        />
      );
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 p-4 w-max mx-auto mt-16">
        {blocks}
      </div>
      <style>{`
        @keyframes pulseBlock {
          0%, 100% {
            opacity: 0.5;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }
      `}</style>
    </>
  );
};

export default Loader2;
