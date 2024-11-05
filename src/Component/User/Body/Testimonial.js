import React, { useEffect, useRef } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css'; // Import Keen Slider styles

function Testimonial() {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 10,
    },
  });

  useEffect(() => {
    if (!instanceRef.current) return;
    const prevBtn = document.getElementById('keen-slider-previous-desktop');
    const nextBtn = document.getElementById('keen-slider-next-desktop');

    if (prevBtn && nextBtn) {
      prevBtn.onclick = () => instanceRef.current.prev();
      nextBtn.onclick = () => instanceRef.current.next();
    }
  }, [instanceRef]);

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-[1340px] px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center lg:gap-16">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Don't just take our word for it...
            </h2>

            <p className="mt-4 text-gray-700">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas veritatis illo placeat
              harum porro optio fugit a culpa sunt id!
            </p>

            <div className="hidden lg:mt-8 lg:flex lg:gap-4">
              <button
                aria-label="Previous slide"
                id="keen-slider-previous-desktop"
                className="rounded-full border border-rose-600 p-3 text-rose-600 transition hover:bg-rose-600 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 rtl:rotate-180"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <button
                aria-label="Next slide"
                id="keen-slider-next-desktop"
                className="rounded-full border border-rose-600 p-3 text-rose-600 transition hover:bg-rose-600 hover:text-white"
              >
                <svg
                  className="size-5 rtl:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>

          <div className="-mx-6 lg:col-span-2 lg:mx-0" ref={sliderRef}>
            <div className="keen-slider">
              <div className="keen-slider__slide">
                <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 lg:p-12">
                  <div>
                    <div className="flex gap-0.5 text-green-500">
                      {/* Your star SVGs here */}
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-rose-600 sm:text-3xl">Stayin' Alive</p>
                      <p className="mt-4 leading-relaxed text-gray-700">
                        No, Rose, they are not breathing. And they have no arms or legs … Where are
                        they? You know what? If we come across somebody with no arms or legs, do we
                        bother resuscitating them? I mean, what quality of life do we have there?
                      </p>
                    </div>
                  </div>
                  <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                    &mdash; Michael Scott
                  </footer>
                </blockquote>
              </div>

              <div className="keen-slider__slide">
                <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 lg:p-12">
                  <div>
                    <div className="flex gap-0.5 text-green-500">
                      {/* Your star SVGs here */}
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-rose-600 sm:text-3xl">Another Testimonial</p>
                      <p className="mt-4 leading-relaxed text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non dolor et
                        sapien facilisis scelerisque.
                      </p>
                    </div>
                  </div>
                  <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                    &mdash; Another Person
                  </footer>
                </blockquote>
              </div>

              {/* Add more slides as needed */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
