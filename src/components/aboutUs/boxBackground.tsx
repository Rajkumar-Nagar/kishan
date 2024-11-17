import { cn } from "@/lib/utils";
import AnimatedGridPattern from "../ui/animated-grid-pattern";

export function AnimatedGridPatternDemo({ children }:any) {
    return (
        <div className=" h-full w-full overflow-hidden p-5 rounded-lg border md:p-20 md:shadow-xl">

            {children}
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                    "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12  fixed inset-0",
                )}
            />
        </div>
    );
}
