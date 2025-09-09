import { forwardRef } from "react";
import {
  InstagramLogoIcon,
  XLogoIcon,
  FacebookLogoIcon,
  TiktokLogoIcon,
} from "@phosphor-icons/react";

interface SubHeaderProps {
  text: string;
}

export const SubHeader = forwardRef<HTMLDivElement, SubHeaderProps>(
  ({ text }, ref) => {
    return (
      <>
        <div
          ref={ref}
          className="w-full flex items-center justify-center lg:justify-around bg-gradient-to-r p-1 from-[#076653] via-[#e3ef26] to-[#e2fbce] text-white text-center fixed top-0 left-0 z-40"
        >
          <img src="/logo.png" alt="" />
          <h3>{text}</h3>
          <span className="hidden lg:flex gap-1 text-black">
            <InstagramLogoIcon
              size={22}
              className="hover:text-red-500 cursor-pointer"
            />
            <XLogoIcon
              size={22}
              className="hover:text-red-500 cursor-pointer"
            />
            <FacebookLogoIcon
              size={22}
              className="hover:text-red-500 cursor-pointer"
            />
            <TiktokLogoIcon
              size={22}
              className="hover:text-red-500 cursor-pointer"
            />
          </span>
        </div>
      </>
    );
  }
);
