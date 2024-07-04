import React from 'react'

function authBackground() {
    return (
        <div className="mainContainer w-full flex flex-row h-full"
            style={{
                backgroundImage: "url(/signIn.jpg)",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >

            <div className="relative backdrop-blur-sm w-full h-full flex p-8 text-white">

                <div className="w-full h-full shadow-lg flex rounded-md overflow-hidden" >


                    <div className="photo_container  w-2/3 bg-orange-300 h-full"
                        style={{
                            backgroundImage: "url(/signIn.jpg)",
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            // backgroundPosition: '',
                        }}>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default authBackground