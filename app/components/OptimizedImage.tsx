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
        unoptimized={imageKey > 5 ? true : false}
        priority={imageKey < 5 ? true : false}
        loading={imageKey < 5 ? "eager" : "lazy"}
        src={imageUrl}
        alt={`${imageName.split("_").shift()?.toString().split(".").shift()}`}
        fill
        sizes={
          imageKey > 5
            ? "(max-width: 1200px) 256px, (max-width: 828px) 128px, (max-width: 640px) 96px, 384px"
            : "75vw"
        }
        className={`
              duration-700 ease-in-out
              ${
                isLoading
                  ? "scale-105 blur-2xl grayscale opacity-0 animate-pulse"
                  : "scale-100 blur-0 grayscale-0 opacity-100 animate-none"
              } w-full -z-10`}
        onLoadingComplete={() => setLoading(false)}
      />
    </>
  );
};

export default OptimizedImage;
