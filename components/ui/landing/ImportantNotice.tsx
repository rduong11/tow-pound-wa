export default function ImportantNotice() {
  return (
    <section className="w-full bg-white pt-2 pb-12 px-4 flex justify-center">
      <div className="w-full max-w-sm border rounded-2xl p-8 flex flex-col items-center text-center shadow-sm">
        <div className="shrink-0 text-[#ED2127] mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>

        <div>
          <p className="text-[#ED2127] font-bold text-sm uppercase tracking-wide mb-3">
            Important Notice
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            If you cannot provide valid proof of ownership, payment must be made
            in person with cash.
          </p>
        </div>
      </div>
    </section>
  );
}
