import Footer from "@/components/Footer";
import Main from "@/components/Main";
import NavBar from "@/components/NavBar";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <NavBar />
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] "
          src="logo.svg"
          alt="Next.js Logo"
          width={300}
          height={60}
          priority
        />
      </div>
      <Main />

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
      <Footer />
    </main>
  );
}
