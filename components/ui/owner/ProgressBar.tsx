import { OWNER_STEPS } from "@/utils/constants/ownerSteps";
import { statusMetaData, VehicleStatus } from "@/utils/schemas/vehicle.schema";

type ProgressBarProps = {
  status: VehicleStatus;
};

export default function ProgressBar({ status }: ProgressBarProps) {
  const totalSteps = OWNER_STEPS.length;
  const currentStep = statusMetaData[status].step;

  return (
    <div className="w-full px-8 py-4">
      <div className="flex items-start justify-between relative">
        <div className="absolute top-4 left-[10%] right-[10%] h-0.5 bg-gray-200 z-0" />

        <div
          className="absolute top-4 left-[10%] h-0.5 bg-[#ED2127] z-0 transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 80}%`,
          }}
        />

        {OWNER_STEPS.map((step) => {
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;

          return (
            <div
              key={step.number}
              className="flex flex-col items-center gap-1.5 z-10 flex-1"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300
                  ${
                    isCompleted
                      ? "bg-[#ED2127] text-white"
                      : isActive
                        ? "bg-[#194A8D] text-white"
                        : "bg-gray-200 text-gray-400"
                  }`}
              >
                {isCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`text-xs text-center max-w-16 leading-tight
                  ${
                    isActive
                      ? "text-[#194A8D] font-medium"
                      : isCompleted
                        ? "text-[#ED2127]"
                        : "text-gray-400"
                  }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
