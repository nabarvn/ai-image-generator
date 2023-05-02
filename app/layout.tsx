import { ClientProvider, Header, Prompt } from "./components";
import "./globals.scss";

export const metadata = {
  title: "AI Image Generator",
  description: "An AI tool which can be used to generate awesome images.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        {/* Header */}
        <Header />

        {/* Prompt Input */}
        <Prompt />

        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
