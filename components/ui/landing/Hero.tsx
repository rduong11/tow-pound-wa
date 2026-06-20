import VehicleSearchInput from "@/components/ui/owner/VehicleSearchInput";

export default function Hero() {
  return (
    <div className="relative w-full bg-[#194A8D] pt-24 pb-40 flex flex-col items-center text-center px-4">
      {/* Chicago flag stars */}
      <div className="flex gap-3 mb-6">
        {[...Array(4)].map((_, i) => (
          <svg
            key={i}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#ED2127"
          >
            <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
          </svg>
        ))}
      </div>

      {/* Headline */}
      <h1 className="font-big-shoulders text-5xl font-bold text-white mb-3 tracking-wide">
        Find Your Towed Vehicle
      </h1>

      {/* Subtitle */}
      <p className="text-blue-200 text-lg mb-8 max-w-md">
        Search by license plate to start the retrieval process.
      </p>

      {/* Search input */}
      <div className="w-full max-w-2xl">
        <VehicleSearchInput />
      </div>

      {/* Format helper text */}
      <p className="text-blue-300 text-sm mt-3">Format: AAA999 or 1234567</p>

      {/* Wave curve at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-32"
        >
          <path d="M0,0 Q720,80 1440,0 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </div>
  );
}
