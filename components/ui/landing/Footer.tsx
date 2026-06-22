import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#194A8D] border-t-2 border-[#ED2127]">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left — seal + city info */}
        <div className="flex items-center gap-3">
          <Image
            src="/chicago-seal.png"
            alt="City of Chicago Seal"
            width={40}
            height={40}
          />
          <div>
            <p className="text-white font-bold text-sm font-big-shoulders">
              City of Chicago
            </p>
            <p className="text-blue-200 text-xs">
              Department of Streets & Sanitation
            </p>
          </div>
        </div>

        {/* Center — links */}
        <div className="flex gap-6 text-xs text-blue-200">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Accessibility
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contact Us
          </a>
        </div>

        {/* Right — copyright */}
        <p className="text-blue-200 text-xs">
          © {new Date().getFullYear()} City of Chicago. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
