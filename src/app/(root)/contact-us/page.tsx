// app/contact/page.js
import { FaHome, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="flex flex-col md:flex-row  relative items-center justify-center min-h-screen bg-cover bg-center p-5 sm:p-10"
      style={{ backgroundImage: "url('/i6.jpg')" }}>

      <div className="temp absolute w-full h-full z-20 bg-[#071925] opacity-80 "></div>

      {/* Contact Details Section */}
      <div className="text-white flex-1 p-6 z-30">
        <h2 className="sm:text-3xl text-2xl font-bold mb-4 text-[#01bed3]">Your Farming Partner is Here to Help</h2>
        <p className="mb-6 opacity-80">
          At Kisan we’re more than just a service — we’re your partner in success. Reach out to us for any support, and let’s grow together!
        </p>

        <div className="mb-4 flex items-center">
          <FaHome className="sm:text-2xl text-xl mr-4" />
          <span>4671 Sugar Camp Road, kota, Rajasthan, 55060</span>
        </div>

        <div className="mb-4 flex items-center">
          <FaPhone className="md:text-2xl text-xl mr-4" />
          <span>+91-6377400183</span>
        </div>

        <div className="mb-4 flex items-center">
          <FaEnvelope className="md:text-2xl text-xl mr-4" />
          <span>rajkumarnagar264@gmail.com</span>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-white z-30 rounded-lg shadow-lg p-8 w-full md:w-1/2 lg:w-1/3 mt-10 md:mt-0">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Send Message</h3>
        <form action="#" method="POST" className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <textarea
            name="message"
            placeholder="Type your Message..."
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-24 resize-none"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Send
          </button>
        </form>
      </div>
      
    </div>
  );
}
