import Image from "next/image";

type CityHeaderProps = {
  variant: "full" | "slim";
};

export default function CityHeader({ variant }: CityHeaderProps) {
  const isSlim = variant === "slim";

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white border-b-2 border-[#ED2127] flex items-center justify-center ${
        isSlim ? "py-2" : "py-3"
      }`}
    >
      <div className="flex items-center gap-3">
        <Image
          src="/chicago-seal.png"
          alt="City of Chicago Seal"
          width={isSlim ? 32 : 40}
          height={isSlim ? 32 : 40}
        />
        <span
          className={`font-big-shoulders font-bold text-[#194A8D] tracking-wide ${
            isSlim ? "text-lg" : "text-2xl"
          }`}
        >
          City of Chicago
        </span>
      </div>
    </header>
  );
}
