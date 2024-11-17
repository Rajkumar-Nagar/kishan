import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import SideBar from '../../../components/custom-sidebar';
import ProfileSidebar from '@/components/profile/profile-sidebar';

async function Profile({ children }: { children: React.ReactNode }) {

    const session = await auth()
    if (!session?.user) redirect("/login")



    return (
        <div className="container  relative max-w-screen-2xl  flex-col md:flex-row  md:px-8 xs:px-4 px-2 rounded-md flex gap-6 py-4">

            <SideBar>
                <ProfileSidebar />
            </SideBar>

            <div className="rightpartContainer flex-1 h-full rounded-md">
                {children}
            </div>
        </div>
    );
}

export default Profile;
