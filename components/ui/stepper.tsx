import React from "react";
import { cn } from "@/lib/utils"; // Optional: for Tailwind CSS utility classes

// Define the props for Stepper
interface StepperProps {
  variant?: "numbers" | "dots"; // Optional: you can add other styles
  steps: string[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({
  variant = "numbers",
  steps,
  currentStep,
}) => {
  return (
    <div className="flex items-center gap-4">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={index} className="flex items-center gap-2">
            {/* Step Icon */}
            <div
              className={cn(
                "flex items-center justify-center rounded-full w-8 h-8 text-sm font-medium",
                {
                  "bg-primary text-white": isActive,
                  "bg-gray-200 text-gray-500": !isActive && !isCompleted,
                  "bg-green-500 text-white": isCompleted,
                }
              )}
            >
              {variant === "numbers" ? index + 1 : isCompleted ? "✓" : "•"}
            </div>

            {/* Step Label */}
            <span
              className={cn("text-sm", {
                "text-primary font-semibold": isActive,
                "text-gray-500": !isActive,
              })}
            >
              {step}
            </span>

            {/* Step Line */}
            {index < steps.length - 1 && (
              <span className="w-6 border-t border-gray-300" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
