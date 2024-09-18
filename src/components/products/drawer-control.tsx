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
        <div className="coropandVarity px-5 py-3 border-2 rounded-md">
            <div className='flex items-center justify-between'>
                <label className='text-[#2e054e] font-semibold text-base cursor-pointer'>{title}</label>
                <button
                    onClick={() => { setIsOpened(prev => !prev) }}
                    className='text-[#2e054e] font-semibold text-base '>
                    {!isOpened ? "+" : "-"}
                </button>
            </div>
            <div
                className="content transition-all duration-200 ease-in-out overflow-hidden [&>div]:py-3"
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