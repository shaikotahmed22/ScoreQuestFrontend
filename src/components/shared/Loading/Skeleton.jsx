import React from "react";

const Skeleton = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="h-2 bg-primary-darkNavy rounded-full max-w-[200px] mb-2.5"></div>
      <div className="h-2 bg-primary-darkNavy  max-w-[160px]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Skeleton;
