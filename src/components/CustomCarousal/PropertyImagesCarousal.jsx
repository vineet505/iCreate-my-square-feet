"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";

const PropertyImagesCarousal = ({ items }) => {

  return (
      <Swiper
      slidesPerView={1}
      onSlideChange={() => {}}
      onSwiper={(swiper) => {}}
      >
        {items.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Image src={item.url} alt="Picture of the author" height={500} width={500} />
            </SwiperSlide>
          );
        })}
      </Swiper>
  );
};

export default PropertyImagesCarousal;
