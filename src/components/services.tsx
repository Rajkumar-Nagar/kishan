import React from 'react'
import Title from './ui/title'
import Image from 'next/image';
import HomeTitle from './HomeTitle';

function Services() {

    // servicesData.js
    const services = [
        {
            title: "Online Mandi",
            description: "Sell your crops directly to buyers across India, ensuring you get the best price for your hard work.",
            image: "/service1.jpg", // Replace with actual image paths
            url: "/services/online-mandi",
        },
        {
            title: "Crop Rate Dashboard",
            description: "Stay updated with daily crop rates and make informed decisions about when to sell.",
            image: "/service2.jpg",
            url: "/services/crop-rate-dashboard",
        },
        {
            title: "AI Bot Assistance",
            description: "Get expert advice and solutions to your farming problems with our AI-powered assistant.",
            image: "/service3.jpg",
            url: "/services/ai-bot-assistance",
        },
        {
            title: "Transport Booking",
            description: "Easily book transport for your crops from the comfort of your home.",
            image: "/service4.jpg",
            url: "/services/transport-booking",
        },
        {
            title: "Labor Booking",
            description: "Find and hire laborers quickly during peak seasons, right from your mobile.",
            image: "/service5.jpg",
            url: "/services/labor-booking",
        },
        {
            title: "Farmer Community",
            description: "Connect with other farmers, share knowledge, and learn from their experiences.",
            image: "/service6.jpg",
            url: "/services/farmer-community",
        },
        {
            title: "Land Transactions",
            description: "Rent or buy land in different locations to expand your farming opportunities.",
            image: "/service7.jpg",
            url: "/services/land-transactions",
        },
    ];


    return (
        <div className="maincontaienr my-4">
            <section className="bg-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <div className='text-center mb-9'>
                        <HomeTitle Title="OUR SERVICES" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-lg rounded-lg overflow-hidden"
                            >
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-48 object-center rounded-t-lg"
                                    width={500}
                                    height={500}
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {service.title}
                                    </h3>
                                    <p className="mt-2 text-gray-600">{service.description}</p>
                                    <a
                                        href={service.url}
                                        className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                    >
                                        See More
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Services