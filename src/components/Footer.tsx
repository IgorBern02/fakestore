import {
  InstagramLogoIcon,
  XLogoIcon,
  FacebookLogoIcon,
  TiktokLogoIcon,
} from "@phosphor-icons/react";

export const Footer = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-center mt-10 lg:justify-around bg-[#282828] text-white text-center bottom-0 left-0 z-40">
      <section>
        <h3>fake store</h3>
        <span className="hidden lg:flex gap-1 text-black">
          <InstagramLogoIcon
            size={22}
            className="hover:text-red-500 cursor-pointer"
          />
          <XLogoIcon size={22} className="hover:text-red-500 cursor-pointer" />
          <FacebookLogoIcon
            size={22}
            className="hover:text-red-500 cursor-pointer"
          />
          <TiktokLogoIcon
            size={22}
            className="hover:text-red-500 cursor-pointer"
          />
        </span>
      </section>
      <section>
        <div>
          <h4>The town</h4>
          <ul>
            <li>HOME</li>
            <li>ABOUT</li>
            <li>CONTACT</li>
            <li>BLOG</li>
          </ul>
        </div>
        <div>
          <h3>Explorar</h3>
          <ul>
            <li>FAQ</li>
            <li>IMPRENSA</li>
            <li>POLITICA DE PRIVACIDADE</li>
          </ul>
        </div>
      </section>
    </div>
  );
};
