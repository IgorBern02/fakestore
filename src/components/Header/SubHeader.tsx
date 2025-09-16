import { forwardRef } from "react";
import {
  InstagramLogoIcon,
  XLogoIcon,
  FacebookLogoIcon,
  TiktokLogoIcon,
} from "@phosphor-icons/react";
import type { SubHeaderProps } from "../../types";

export const SubHeader = forwardRef<HTMLDivElement, SubHeaderProps>(
  ({ text }, ref) => {
    return (
      <>
        <div
          ref={ref}
          className="w-full flex items-center justify-center lg:justify-around bg-gradient-to-r p-1 from-[#f56218] via-[#fa8d10] to-[#ff9d2e] text-white text-center fixed top-0 left-0 z-40"
        >
          <img src="/logo.png" alt="" />
          <h3>{text}</h3>
          <span className="hidden lg:flex gap-1 text-white">
            <InstagramLogoIcon
              size={22}
              className="hover:text-black cursor-pointer"
            />
            <XLogoIcon size={22} className="hover:text-black cursor-pointer" />
            <FacebookLogoIcon
              size={22}
              className="hover:text-black cursor-pointer"
            />
            <TiktokLogoIcon
              size={22}
              className="hover:text-black cursor-pointer"
            />
          </span>
        </div>
      </>
    );
  }
);
