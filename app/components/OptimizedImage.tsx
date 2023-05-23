"use client";

import Image from "next/image";
import { useState } from "react";

type Image = {
  imageKey: number;
  imageName: string;
  imageUrl: string;
};

const OptimizedImage = ({ imageKey, imageName, imageUrl }: Image) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      <Image
        unoptimized
        priority={imageKey === 0 ? true : false}
        loading={`${imageKey === 0 ? "eager" : "lazy"}`}
        src={imageUrl}
        alt={`${imageName.split("_").shift()?.toString().split(".").shift()}`}
        fill
        className={`
              duration-700 ease-in-out
              ${
                isLoading
                  ? "scale-105 blur-2xl grayscale opacity-0"
                  : "scale-100 blur-0 grayscale-0 opacity-100"
              } w-full -z-10`}
        onLoadingComplete={() => setLoading(false)}
      />
    </>
  );
};

export default OptimizedImage;
