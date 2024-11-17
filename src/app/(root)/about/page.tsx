import { AnimatedTestimonialsDemo } from '@/components/aboutUs/animatedTestomials';
import { AnimatedGridPatternDemo } from '@/components/aboutUs/boxBackground';
import { FeaturesSectionDemo } from '@/components/aboutUs/FeatureSection';
import { FocusCardsDemo } from '@/components/aboutUs/focusCard';
import { ParticlesDemo } from '@/components/aboutUs/visionButtons';
import Faq from '@/components/Faq';
import React from 'react';

const page = () => {
  return (
    <div className="maincontainer bg-[#324451]">
      {/* Header Section */}
      <div className="mainContainerHeader bg-[#071925]">
        <div className="mainbox header  sm:p-8">
          <div
            className="flex flex-col items-center justify-center rounded-lg overflow-hidden relative min-h-96 bg-cover bg-center p-5 sm:p-10"
            style={{ backgroundImage: "url('/about2.jpeg')" }}
          >
            {/* Background Overlay */}
            <div className="temp absolute w-full h-full z-20 bg-[#071925] opacity-80"></div>

            {/* Centered Content */}
            <div className="z-30 text-center">
              {/* Title */}
              <h2 className="text-3xl sm:text-7xl font-extrabold text-[#00D26A] mb-6">
                About Us
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-lg leading-relaxed max-w-3xl text-[#A3E4D7] mx-auto">
                At Kisan, we are revolutionizing agriculture by empowering farmers
                with modern tools, real-time crop insights, and sustainable farming solutions.
                Bridging the gap between technology and tradition, we aim to create a thriving
                community of farmers who grow with innovation and nurture the Earth for
                generations to come. Together, let’s cultivate a prosperous future.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="afterHeader">
        <AnimatedGridPatternDemo>

          {/* Services Section */}
          <div className="Features mb-16">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-[#A3E4D7] mb-0">
              Our Services
            </h1>
            <FeaturesSectionDemo />
          </div>

          {/* Vision Section */}
          <div className="Visionk mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-center text-[#A3E4D7] mb-20">
              Our Vision
            </h1>
            <div
              className="vision flex justify-center flex-wrap gap-2"
              style={{
                display: 'grid',
                gap: 5,
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              }}
            >
              <ParticlesDemo title="Innovation" ImageUrl="/vision1.jpg" />
              <ParticlesDemo title="Sustainability" ImageUrl="/vision3.jpg" />
              <ParticlesDemo title="Community" ImageUrl="/vision2.jpg" />
              <ParticlesDemo title="Empowerment" ImageUrl="/vision5.jpeg" />
            </div>
          </div>

          <div className="why mb-20">
            <h1 className="text-4xl sm:text-5xl font-bold text-center text-[#A3E4D7] mb-20">
              Why choose Us
            </h1>
            <FocusCardsDemo />
          </div>

          {/* Testimonials Section */}
          <div className="Testimonials mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-center text-[#A3E4D7] mb-10">
              Testimonials
            </h1>
            <AnimatedTestimonialsDemo />
          </div>

          {/* FAQ Section */}
          <div className="FAQ mb-16">
            <Faq />
          </div>
        </AnimatedGridPatternDemo>
      </div>
    </div>
  );
};

export default page;
