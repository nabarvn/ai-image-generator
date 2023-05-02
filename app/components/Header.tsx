import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className='flex justify-between items-center sticky top-0 bg-white z-50 shadow-md p-5'>
      {/* Left */}
      <div className='flex space-x-2 items-center w-[70%]'>
        <Image
          src='https://links.papareact.com/4t3'
          alt='Logo'
          height={30}
          width={30}
        />

        <div>
          <h1 className='font-bold'>
            <span className='text-violet-500'>AI</span> Image Generator
          </h1>
          <h2 className='text-xs'>
            Powered by DALL-E 2, ChatGPT, and Microsoft Azure!
          </h2>
        </div>
      </div>

      {/* Right */}
      <div className='flex flex-col md:flex-row text-xs h-full md:text-base divide-y md:divide-x md:divide-y-0 items-center text-gray-700'>
        <Link
          href='https://chad.nabarun.ai'
          target='_blank'
          className='py-1 md:px-2 font-semibold md:text-right'
        >
          Try ChadGPT
        </Link>
        <Link
          href='https://nabarun.xyz'
          target='_blank'
          className='py-1 md:px-2 font-semibold'
        >
          Nabarun
        </Link>
      </div>
    </header>
  );
};

export default Header;
