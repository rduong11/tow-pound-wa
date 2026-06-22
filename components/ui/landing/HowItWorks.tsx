export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Search Your Vehicle",
      description:
        "Enter your license plate number to locate your towed vehicle in our system.",
    },
    {
      number: 2,
      title: "Submit Your Information",
      description:
        "Provide your personal details and proof of identity for verification.",
    },
    {
      number: 3,
      title: "Pay & Pick Up",
      description:
        "Once approved, pay online or in person and retrieve your vehicle with your pickup code.",
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="h-0.5 bg-[#ED2127] mb-16 -mx-4" />
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <h2 className="font-big-shoulders text-4xl font-bold text-[#194A8D]">
            How It Works
          </h2>
          <div className="w-16 h-1 bg-[#ED2127] mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center border rounded-xl p-8 shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-[#ED2127] flex items-center justify-center text-white font-bold text-lg mb-4">
                {step.number}
              </div>
              <h3 className="font-bold text-[#194A8D] text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
