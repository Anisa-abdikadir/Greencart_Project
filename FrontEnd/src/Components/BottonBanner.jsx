import React from 'react'
import { assets, features } from '../assets/assets'
import fast_delivery from "../assets/fast_delivery.png"

const BottonBanner = () => {
  return (
    <div className="relative mt-10 overflow-hidden rounded-2xl">

      {/* Background */}
      <img
        className="absolute inset-0 w-full h-full object-cover"src={assets.bg_green_image}alt=""/>

      <div className="relative min-h-[650px] md:min-h-[330px] flex flex-col md:block">

        {/* LEFT */}
        <div
          className="relative mx-auto mt-8 bg-primary w-[220px] h-[220px] rounded-t-[110px] md:absolute md:top-10 md:left-10 md:mx-0 md:mt-0 md:w-[300px] md:h-[290px] md:rounded-t-[140px]">

          <img
            className="absolute bottom-0 left-0 w-full"src={assets.bottom_banner_image}alt="bottom_banner"/>

          <div
            className="absolute top-1/2 -right-20 -translate-y-1/2 rounded-full bg-[#eefaff] px-3 py-2 flex items-center gap-2 shadow-md">
            <img className="w-10 h-10 object-contain"src={fast_delivery}alt="Fast Delivery"/>

            <p className="text-sm font-semibold whitespace-nowrap">
              Fast Delivery
              <span className="block text-black">
                In 30 Min
              </span>
            </p>
          </div>

        </div>


        {/* RIGHT */}
        <div
          className="relative mt-12 flex justify-center pb-8 md:absolute md:inset-0 md:flex md:items-center md:justify-end md:mt-0 md:pb-0 md:pr-24">

          <div className="w-[90%] md:w-auto">

            <h1 className="text-2xl md:text-3xl text-primary font-semibold mb-6 text-center md:text-left">
              Why We Are the Best?
            </h1>

            {features.map((feature, index) => (
              <div key={index}className="flex items-center gap-4 mt-3">

                <img src={feature.icon}alt={feature.title} className="w-9 md:w-11"/>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="text-gray-500/70 text-xs md:text-sm">
                    {feature.description}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  )
}

export default BottonBanner
