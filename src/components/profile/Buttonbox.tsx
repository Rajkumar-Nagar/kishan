"use client"
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

function Buttonbox({ title, imgurl, url, nav }) {
    const router = useRouter();
    const path=usePathname()

    const handleButton = () => {
      
        router.push(url);
    };

    const change = path === url;

    return (
        <button onClick={handleButton} className="buttonspart w-full rounded-md">
            <div className="buttonbox flex items-center justify-between px-4 py-2"
                style={{
                    backgroundColor: change ? "#f0f8ff" : "#ffff"
                }}
            >
                <div className="left flex items-center gap-4">
                    <Image width={25} height={25} alt='icon' src={imgurl} />
                    <h1 className='text-base font-normal text-[#002f34]'
                        style={{
                            color: change ? "#09f" : "#002f34"
                        }}
                    >{title}</h1>
                </div>

                <div className="right">
                    <Image width={25} height={25} alt='arrow' src={change ? "/right2.png" : "/right3.png"} />
                </div>
            </div>
        </button>
    );
}

export default Buttonbox;
