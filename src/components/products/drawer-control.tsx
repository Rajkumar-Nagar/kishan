import React from "react";

interface DrawerProps {
    title: string;
    children: React.ReactNode;
}

export const DrawerControl = ({ title, children }: DrawerProps) => {
    const [isOpened, setIsOpened] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxheight] = React.useState("0px")

    React.useEffect(() => {
        const height = ref.current?.scrollHeight;
        setMaxheight(!isOpened ? "0px" : height + "px");
    }, [isOpened]);


    return (
        <div className="px-5 py-3 border-2 rounded-md">
            <button
                onClick={() => { setIsOpened(prev => !prev) }}
                className='text-[#2e054e] font-semibold text-base w-full'
            >
                <div className='flex items-center justify-between'>
                    <label className='text-[#2e054e] font-semibold text-base cursor-pointer'>{title}</label>
                    <span>{!isOpened ? "+" : "-"}</span>
                </div>
            </button>
            <div
                className="content transition-all duration-200 ease-in-out overflow-hidden overflow-y-auto [&>div]:py-3"
                ref={ref}
                style={{
                    maxHeight
                }}
            >
                {children}
            </div>
        </div>
    )
}