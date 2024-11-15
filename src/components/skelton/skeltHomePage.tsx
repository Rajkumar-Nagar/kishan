import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function SkelCropCard() {
  return (
    <div className="relative min-w-80 space-y-3 p-6 bg-gray-50 dark:bg-black border rounded-xl border-black/[0.1] dark:border-white/[0.2] w-auto sm:w-[30rem] h-auto">
      {/* Image Skeleton */}
      <Skeleton className="h-48 w-full rounded-xl" />

      {/* Crop Name / Quantity */}
      <div className="flex justify-between items-center mt-2">
        <Skeleton className="h-6 w-[200px] rounded" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>

      {/* Price and Variety */}
      <div className="flex items-center gap-2 pb-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-4 w-[80px]" />
      </div>

      {/* Details Button */}
      <Skeleton className="h-10 w-full rounded-md mt-2" />

      {/* Location Information */}
      <div className="flex items-center pt-2 mt-2 gap-2 border-t-[2px] max-w-60">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}


export function SkelServices() {
  return (
    <div className="maincontainer bg-gray-100">
      <section className="py-12">
        <div className="container mx-auto sm:px-10 xs:px-8 px-4">
          <div className='text-center mb-9'>
            <Skeleton className="h-8 w-48 mx-auto" /> {/* Skeleton for title */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(7).fill(0).map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                {/* Image Skeleton */}
                <Skeleton className="w-full h-48 object-center rounded-t-lg" />

                {/* Content Skeleton */}
                <div className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4" /> {/* Title skeleton */}
                  <Skeleton className="h-4 w-full" /> {/* Description line 1 */}
                  <Skeleton className="h-4 w-5/6" /> {/* Description line 2 */}
                  <Skeleton className="h-10 w-24 mt-4 rounded" /> {/* Button skeleton */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


export function SkelAppleCard() {
  <div className="relative w-72 h-96 bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
    {/* Image skeleton */}
    <Skeleton className="absolute inset-0 h-full w-full rounded-3xl" />

    {/* Overlay gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-10 pointer-events-none" />

    {/* Text placeholders */}
    <div className="relative z-20 p-4">
      <Skeleton className="h-4 w-20 mb-2" /> {/* Category */}
      <Skeleton className="h-6 w-48 mb-4" /> {/* Title */}
      <Skeleton className="h-4 w-40" />       {/* Description */}
    </div>
  </div>
}

export function CardGridSkeleton() {
  return (
    <div className="w-full h-full p-7">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="relative overflow-hidden bg-white rounded-xl h-full w-full">
            {/* Skeleton for card content */}
            <Skeleton className="h-56 w-full rounded-t-xl" /> {/* Image area */}
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-1/2" /> {/* Placeholder for title */}
              <Skeleton className="h-4 w-1/3" /> {/* Placeholder for subtitle */}
            </div>
          </div>
        ))}
      </div>
      <Skeleton className="absolute h-full w-full left-0 top-0 bg-black opacity-30 pointer-events-none z-10" />
    </div>
  );
}

export function TestimonialsSkeleton() {
  return (
    <div className="maincontainer md:space-y-10 space-y-6">
      {/* Skeleton for the title */}
      <Skeleton className="h-8 w-1/3 mx-auto" /> {/* Placeholder for title */}

      {/* Skeleton for the testimonials card section */}
      <div className="h-[25rem] flex flex-col antialiased bg-black bg-grid-white/[0.05] items-center justify-center relative overflow-hidden space-y-4">
        <div className="flex gap-4 overflow-hidden">
          {/* Placeholder for moving testimonial cards */}
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              className="w-[18rem] h-[10rem] bg-white rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}



export function FaqSkeleton() {
  return (
    <div className="listedProduct my-20 px-6 sm:px-20 container max-w-screen-lg">
      {/* Skeleton for the title */}
      <Skeleton className="h-8 w-2/3 mx-auto mb-10" />

      {/* Skeletons for FAQ items */}
      <div className="space-y-6">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="w-full border-b-2 py-3">
            {/* Skeleton for question */}
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-5" /> {/* For the dropdown icon */}
            </div>
            {/* Skeleton for answer */}
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}



export function FooterSkeleton() {
  return (
    <footer className="bg-gray-800 text-white py-8 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Contact Us Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">
              <Skeleton className="h-6 w-[150px]" />
            </h4>
            <p className="mb-2">
              <Skeleton className="h-4 w-[200px]" />
            </p>
            <p className="mb-2">
              <Skeleton className="h-4 w-[150px]" />
            </p>
            <p>
              <Skeleton className="h-4 w-[250px]" />
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">
              <Skeleton className="h-6 w-[150px]" />
            </h4>
            <ul className="space-y-2">
              <li><Skeleton className="h-4 w-[100px]" /></li>
              <li><Skeleton className="h-4 w-[120px]" /></li>
              <li><Skeleton className="h-4 w-[100px]" /></li>
              <li><Skeleton className="h-4 w-[80px]" /></li>
              <li><Skeleton className="h-4 w-[120px]" /></li>
              <li><Skeleton className="h-4 w-[100px]" /></li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">
              <Skeleton className="h-6 w-[150px]" />
            </h4>
            <div className="flex space-x-4">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>

          {/* Stay Updated Section */}
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-4">
              <Skeleton className="h-6 w-[150px]" />
            </h4>
            <form>
              <Skeleton className="h-10 w-full mb-2 rounded" />
              <Skeleton className="h-10 w-[120px] rounded" />
            </form>
          </div>
        </div>

        {/* About and Legal Info */}
        <div className="mt-8 text-center">
          <h4 className="text-lg font-semibold mb-2">
            <Skeleton className="h-6 w-[150px]" />
          </h4>
          <p className="mb-4">
            <Skeleton className="h-4 w-[250px]" />
          </p>
          <p>
            <Skeleton className="h-4 w-[150px]" />
            {" | "}
            <Skeleton className="h-4 w-[150px]" />
          </p>
        </div>
      </div>
    </footer>
  );
}


export function ChatGpt() {
  return (
    <div className="px-4 py-2 justify-center text-base md:gap-6 m-auto">
      <div className="flex flex-1 text-base mx-auto gap-3 md:px-5 lg:px-1 xl:px-5 w-full group">
        <div className='flex-shrink-0 flex flex-col relative items-end'>
          <div>
            <Avatar>
              <AvatarImage src={''} />
              <AvatarFallback>{'AI'}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className='relative flex w-full flex-col'>
          {/* <div className='pb-2'>{'AI'}</div> */}
          <div className="flex-1 overflow-x-auto">
            <div className="space-y-2" >
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-10 w-24 mt-4 rounded" />
            </div >
          </div>
        </div>
      </div>
    </div>
  )
}









