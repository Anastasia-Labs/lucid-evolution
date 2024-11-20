import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10">
      <div>
        <p className="font-bold">
          Elemental Stake Pool <br />
          Providing reliable staking services since 2020
        </p>
        <p>Copyright © 2023 - All right reserved</p>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <Link href="https://twitter.com/elementalpool">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] "
              src="logo-x.svg"
              alt="Next.js Logo"
              width={20}
              height={60}
              priority
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
