import React from "react";
function ProgressBar({ progress = 0 }) {
  return (
    <div className="w-full mt-7">
      <div className="bg-gray-300 w-full h-6 rounded-full overflow-hidden flex items-center justify-center">
        <div
          className="bg-blue-500 h-6 text-[15px] text-white flex items-center justify-center transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        >
          {progress > 5 && `${Number(progress).toFixed(0)}%`}
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
