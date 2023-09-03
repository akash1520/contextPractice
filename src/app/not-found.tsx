import Link from "next/link";
import Navbar from "./components/Navbar/Navbar";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#feec01]">
      <Navbar />
      <div className="flex flex-col flex-1 justify-center items-center">
        <h1 className="text-6xl md:text-7xl lg:text-9xl font-medium font-gothic text-center">
          404 - Page Not Found
        </h1>
        <p className="max-w-4xl font-medium font-raleway md:text-xl text-center mt-6">
          Oops! It seems you&apos;ve stumbled upon a page that doesn&apos;t
          exist.
        </p>
        <div className="flex flex-wrap gap-8 md:justify-center mt-10">
          <Link
            href="/"
            className="btn md:w-[250px] px-12 py-2 bg-white justify-center"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
