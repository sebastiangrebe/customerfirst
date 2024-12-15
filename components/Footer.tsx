import Link from "next/link";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer id="footer" className="mx-auto">
      <hr className="w-11/12" />

      <section className="max-w-7xl container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8 mx-auto px-6">
        <div className="col-span-full xl:col-span-2">
          <Logo />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Contact</h3>

          <div>
            <a
              target="_blank"
              href="https://twitter.com/sebastiangrebe"
              className="opacity-60 hover:opacity-100"
            >
              Twitter
            </a>
          </div>

          <div>
            <a

              target="_blank"
              href="mailto:sebigrebe@gmail.com"
              className="opacity-60 hover:opacity-100"
            >
              Email
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">About</h3>
          <div>
            <a

              href="/#howitworks"
              className="opacity-60 hover:opacity-100"
            >
              How It Works
            </a>
          </div>


          {/* <div>
            <a

              href="/#faq"
              className="opacity-60 hover:opacity-100"
            >
              FAQ
            </a>
          </div> */}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Legal</h3>
          <div>
            <Link

              href="/legal/tos"
              className="opacity-60 hover:opacity-100"
            >
              Terms of Service
            </Link>
          </div>

          <div>
            <Link

              href="/legal/privacy-policy"
              className="opacity-60 hover:opacity-100"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      <section className="container pb-14 text-center  mx-auto">
        <h3>
          Copyright © 2024 - All rights reserved
        </h3>
      </section>
    </footer>
  );
};
