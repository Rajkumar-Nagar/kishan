import { account } from '@/data';
import { getDataFromId } from '@/actions/productId.actio';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Buttonbox from '@/components/profile/Buttonbox';
import { auth } from '@/auth';
import Link from 'next/link';
import CImage from '@/components/Cimage';
import { redirect } from 'next/navigation';
import Banner from './_banner';

async function Profile({ children }: { children: React.ReactNode }) {

    const session = await auth()
    if (!session?.user) redirect("/login")

    const user = await getDataFromId(session.user.id as string, "user")

    return (
        <div className="maincontainer pt-10 rounded-md overflow-hidden flex items-center justify-center gap-6">
            <div className="leftpartContainer w-[25%] rounded-md border-2">
                <div className="profileDetails bg-gray-200 gap-3 pb-5 border-b-[1px] flex flex-col">
                    <div className="profilePicture relative flex justify-center h-20 bg-slate-300">
                        <Banner userId={user.id} bgImage={user.backgroundImage} />
                        <div className="profileImage absolute -bottom-12">
                            {
                                user?.avatar ?
                                    <CImage
                                        alt="Uploaded Image"
                                        src={user?.avatar}
                                        width={"170"}
                                        height={"170"}
                                        className='w-24 h-24 rounded-full'
                                        crop={{
                                            type: 'auto',
                                            source: true
                                        }}
                                    /> : (
                                        <div className="profile w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center">
                                            <h1 className="text-[#002f34] text-xl font-semibold">{user?.name?.slice(0, 1)}</h1>
                                        </div>
                                    )
                            }

                        </div>
                    </div>
                    <div className="details flex flex-col mt-12 px-6 space-y-1">
                        <h1 className='text-xl font-semibold text-[#002f34]'>{user?.name}</h1>
                        <div className="duaration flex items-center gap-2">
                            <Image width={12} height={10} src={"/calendar.png"} alt='calendar' />
                            <h1 className='text-sm font-semibold text-[#444c4d]'>since from july 2024 </h1>
                        </div>
                        <div className="rating flex items-center gap-2">
                            <h1 className='text-xl font-semibold text-[#002f34]'>4</h1>
                            <Image width={20} height={20} src={"/star.png"} alt='star' />
                            <h1 className='text-sm font-semibold text-[#444c4d]'>(232 user)</h1>
                        </div>
                        <div className="location flex items-center gap-2">
                            <Image width={15} height={20} src={"/location1.png"} alt='location' />
                            <h1 className='text-sm font-semibold text-[#444c4d]'>baran,rajshathan,kota,5479834</h1>
                        </div>
                    </div>
                    <Button className='mx-5'>
                        <Link href={"/profile/editProfile"}>
                            Edit Profile
                        </Link>
                    </Button>
                </div>
                <div className="afterprofile flex flex-col space-y-1 py-4 px-3">
                    {account.map((item, index) => (
                        <Buttonbox key={index} title={item.title} imgurl={item.image} url={item.url} nav={item.nav} />
                    ))}
                </div>
                <div className='mx-5'>
                    <button className='text-base font-semibold w-full items-center justify-center border-[1px] hover:border-[#09f] py-2 my-1 rounded-md hover:bg-[#f0f8ff] hover:text-[#09f]'>
                        Logout
                    </button>
                </div>
            </div>
            <div className="rightpartContainer w-[60%] h-body rounded-md">
                {children}
            </div>
        </div>
    );
}

export default Profile;
