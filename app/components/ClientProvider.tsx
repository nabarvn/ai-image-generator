"use client";

import { Toaster } from "react-hot-toast";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster position='bottom-center' />
      {children}
    </>
  );
};

export default RootLayout;
