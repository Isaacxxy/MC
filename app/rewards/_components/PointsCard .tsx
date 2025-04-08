import { steps } from "@/data/index";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const PointsSection = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center gap-20 relative'>
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className='w-full flex flex-col items-center justify-center gap-10'>
        <div className='my-8 w-full text-center space-y-20 z-10'>
          <p className='md:text-3xl text-2xl font-bold capitalize'>
            How it works?
          </p>
          <div className="flex flex-col justify-between gap-28 items-center relative overflow-hidden w-[80%] mx-auto">
            <div className="w-[1px] h-full bg-black absolute top-10 bottom- left-1/2 transform translate-y-1 -translate-x-1/2" />
            {steps.map((step, index) => (
              <div key={step.id} className="grid grid-cols-3 gap-4 items-center justify-center w-full">
                {index % 2 === 0 ? (
                  <>
                    <div className="col-span-1" />
                    <div className="col-span-1 flex justify-center">
                      <Step icon={step.icon} text={step.title} />
                    </div>
                    <div className="div2 mx-auto col-span-1 flex items-center justify-center">
                      <div className=" w-64 p-4 text-sm bg-green-800 text-white text-center">
                        {step.description}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="div2 mx-auto col-span-1 flex items-center justify-center">
                      <div className=" w-64 p-4 text-sm bg-green-800 text-white text-center">
                        {step.description}
                      </div>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <Step icon={step.icon} text={step.title} />
                    </div>
                    <div className="col-span-1" />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Step = ({ icon, text, className }: { icon: ReactNode, text: string, className?: string }) => {
  return (
    <div className={cn('relative flex flex-col items-center justify-center bg-green-800 text-white p-6 rounded-full w-[126px] h-[126px] mx-auto', className)}>
      <div className="text-3xl">{icon}</div>
      <p className="text-base mt-2 text-center">{text}</p>
    </div>
  );
};

export default PointsSection;