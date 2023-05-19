"use client";

import { fetchImages } from "@/lib";
import Image from "next/image";
import useSWR from "swr";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

type Image = {
  name: string;
  url: string;
};

type ImagesData = {
  images: Image[];
};

const Images = () => {
  const {
    data,
    isLoading,
    mutate: refreshImages,
    isValidating,
  } = useSWR<ImagesData | void>("images", fetchImages, {
    revalidateOnFocus: false,
  });

  return (
    <div>
      {isLoading && (
        <p className='animate-pulse text-center font-extralight mt-24'>
          Loading <span className='text-violet-500'>AI</span> Generated
          Images...
        </p>
      )}

      <button
        onClick={() => refreshImages(data)}
        className='fixed hidden md:block bottom-5 right-3 md:bottom-9 md:right-9 w-32 md:w-40 text-xs md:text-base bg-violet-500/90 text-white rounded-md font-bold active:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 px-5 py-3 z-20'
      >
        {!isLoading && isValidating ? "Refreshing..." : "Refresh Images"}
      </button>

      <button
        onClick={() => refreshImages(data)}
        className='fixed md:hidden bottom-5 right-3 md:bottom-9 md:right-9 bg-violet-500/90 text-white rounded-md active:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 p-2 z-20'
      >
        <ArrowPathIcon
          className={`h-7 w-7 ${!isLoading && isValidating && "animate-spin"}`}
        />
      </button>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-1 md:px-9'>
        {data?.images.map((image: Image, i: number) => (
          <div
            key={image.url}
            className={`relative cursor-help ${
              i == 0 && "md:col-span-2 md:row-span-2"
            } hover:scale-[102%] transition-transform duration-200 ease-in-out`}
          >
            {/* Create a white div that appears when the parent div is hovered upon */}
            <div className='absolute flex justify-center items-center h-full w-full bg-white opacity-0 hover:opacity-75 transition-opacity duration-200 z-10'>
              <p className='text-center font-light text-lg p-5'>
                {/* Removes timestamp as well as file extension and displays the prompt used to generate the image */}
                &quot;
                {image.name.split("_").shift()?.toString().split(".").shift()}
                &quot;
              </p>
            </div>
            <Image
              priority
              unoptimized
              src={image.url}
              alt={image.name}
              height={700}
              width={700}
              className='w-full rounded-sm shadow-2xl drop-shadow-lg -z-10'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;
