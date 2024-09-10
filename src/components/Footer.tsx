import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-between">
        {/* Contact Us Section */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p className="mb-2">Email: <a href="mailto:support@kisan.com" className="text-orange-400 hover:underline">support@kisan.com</a></p>
          <p className="mb-2">Phone: +91-XXXXXXXXXX</p>
          <p>Address: [Your Office Address Here]</p>
        </div>

        {/* Quick Links Section */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="text-orange-400 hover:underline">Home</Link></li>
            <li><Link href="/services" className="text-orange-400 hover:underline">Services</Link></li>
            <li><Link href="/about" className="text-orange-400 hover:underline">About Us</Link></li>
            <li><Link href="/blog" className="text-orange-400 hover:underline">Blog</Link></li>
            <li><Link href="/contact" className="text-orange-400 hover:underline">Contact</Link></li>
            <li><Link href="/faqs" className="text-orange-400 hover:underline">FAQs</Link></li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-400"><i className="fab fa-facebook-f"></i></Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-400"><i className="fab fa-twitter"></i></Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-400"><i className="fab fa-instagram"></i></Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-400"><i className="fab fa-linkedin-in"></i></Link>
          </div>
        </div>

        {/* Stay Updated Section */}
        <div className="w-full md:w-1/4">
          <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
          <form>
            <input type="email" placeholder="Your Email" className="p-2 w-full mb-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"/>
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Subscribe</button>
          </form>
        </div>
      </div>

      {/* About and Legal Info */}
      <div className="mt-8 text-center">
        <h4 className="text-lg font-semibold mb-2">About Kisan</h4>
        <p className="mb-4">Empowering farmers with innovative solutions for a prosperous agricultural future.</p>
        <p>
          <a href="/privacy-policy" className="text-orange-400 hover:underline">Privacy Policy</a> |
          <a href="/terms-of-service" className="text-orange-400 hover:underline">Terms of Service</a>
        </p>
      </div>
    </div>
  </footer>

  )
}

export default Footer