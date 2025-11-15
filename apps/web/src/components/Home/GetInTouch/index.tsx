import Link from 'next/link';
import Image from 'next/image';

const GetInTouch: React.FC = () => {
    return (
        <section className="pb-0">
            <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
                <div className="relative rounded-t-2xl overflow-hidden">
                    <Image
                        src="/images/categories/pexels-amit-baokar-1895455-5050812.jpg"
                        alt="Luxurious real estate property"
                        fill
                        className="object-cover -z-10 brightness-95"
                        priority
                        unoptimized
                    />

                    {/* Gradient Overlay - Similar to Hero section */}
                    <div className='absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/50 to-black/40 dark:from-black/70 dark:via-black/60 dark:to-black/50' />

                    <div className="relative z-10 lg:py-64 md:py-28 py-10">
                        <div className="flex flex-col items-center gap-8">
                            <h2 className='text-white lg:text-52 md:text-40 text-3xl max-w-3/4 text-center font-medium'>
                                Find Your Dream Home
                            </h2>
                            <div className='flex flex-col xs:flex-row items-center gap-4'>
                                <Link href="/properties" className='bg-white py-4 px-8 rounded-full text-dark hover:bg-dark hover:text-white duration-300'>
                                    Explore properties
                                </Link>
                                <Link href="/contactus" className='px-8 py-4 border border-white bg-transparent text-white hover:bg-white hover:text-dark duration-300 rounded-full'>
                                    Get in touch
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full py-5 bg-primary rounded-b-2xl overflow-hidden">
                    <div className="flex items-center gap-40 animate-slide">
                        <p className='text-white whitespace-nowrap relative after:absolute after:w-20 after:h-px after:bg-white after:top-3 after:-right-32'>
                            GET A FREE PROPERTY VALUATION—SELL YOUR HOME WITH CONFIDENCE!
                        </p>
                        <p className='text-white whitespace-nowrap relative after:absolute after:w-20 after:h-px after:bg-white after:top-3 after:-right-32'>
                            BROWSE THOUSANDS OF LISTINGS IN PRIME LOCATIONS AT GREAT PRICES!
                        </p>
                        <p className='text-white whitespace-nowrap relative after:absolute after:w-20 after:h-px after:bg-white after:top-3 after:-right-32'>
                            GET A FREE PROPERTY VALUATION—SELL YOUR HOME WITH CONFIDENCE!
                        </p>
                        <p className='text-white whitespace-nowrap relative after:absolute after:w-20 after:h-px after:bg-white after:top-3 after:-right-32'>
                            BROWSE THOUSANDS OF LISTINGS IN PRIME LOCATIONS AT GREAT PRICES!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GetInTouch;