'use client';

export default function Loader() {
  return (
    <div className="h-[70vh] flex justify-center items-center bg-transparent">
      <div className="relative w-20 h-20">
        {/* Glowing shadow pulse */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 opacity-40 blur-xl animate-ping"></div>

        {/* Rotating ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-purple-600 animate-spin"></div>

        {/* Inner solid circle */}
        <div className="absolute top-2 left-2 right-2 bottom-2 rounded-full bg-white"></div>

        {/* Text or logo (optional) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-purple-600 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
