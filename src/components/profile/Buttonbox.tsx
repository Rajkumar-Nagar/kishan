"use client"
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

type ButtonboxProps = {
    title: string;
    imgurl: string;
    url: string;
    nav: string;
}

function Buttonbox({ title, imgurl, url, nav }: ButtonboxProps) {
    const router = useRouter();
    const path = usePathname()

    const handleButton = () => {
        router.push(url);
    };

    const isActive = path === url;

    return (
        <button onClick={handleButton} className="buttonspart w-full rounded-md cursor-pointer">
            <div className="buttonbox flex items-center justify-between px-4 py-2"
                style={{
                    backgroundColor: isActive ? "#f0f8ff" : "#ffff"
                }}
            >
                <div className="text-left flex items-center gap-4">
                    <Image width={25} height={25} alt='icon' src={imgurl} />
                    <h1 className='text-base font-normal text-[#002f34]'
                        style={{
                            color: isActive ? "#09f" : "#002f34"
                        }}
                    >{title}</h1>
                </div>

                <div className="right">
                    <Image width={25} height={25} alt='arrow' src={isActive ? "/right2.png" : "/right3.png"} />
                </div>
            </div>
        </button>
    );
}

export default Buttonbox;
