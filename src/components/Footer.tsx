import {
  InstagramLogoIcon,
  XLogoIcon,
  FacebookLogoIcon,
  TiktokLogoIcon,
} from "@phosphor-icons/react";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full flex flex-col lg:flex-row items-center justify-center pt-5 mt-10 gap-8 lg:justify-around bg-[#282828] text-white text-center overflow-x-hidden lg:grid grid-cols-1 ">
      {/* Logo + Socials */}
      <section className="w-full flex flex-col lg:flex-row gap-4 items-center justify-center lg:justify-around">
        <h3 className="text-3xl lg:text-4xl font-bold">fake store</h3>
        <div className="flex gap-5">
          <a href="#" aria-label="Instagram">
            <InstagramLogoIcon
              size={26}
              className="hover:text-red-500 cursor-pointer transition-colors"
            />
          </a>
          <a href="#" aria-label="X (Twitter)">
            <XLogoIcon
              size={26}
              className="hover:text-red-500 cursor-pointer transition-colors"
            />
          </a>
          <a href="#" aria-label="Facebook">
            <FacebookLogoIcon
              size={26}
              className="hover:text-red-500 cursor-pointer transition-colors"
            />
          </a>
          <a href="#" aria-label="TikTok">
            <TiktokLogoIcon
              size={26}
              className="hover:text-red-500 cursor-pointer transition-colors"
            />
          </a>
        </div>
      </section>

      {/* Links */}
      <section className="flex flex-col md:flex-row gap-6 w-full justify-center lg:justify-start lg:ml-72 lg:gap-20">
        <div className="text-center lg:text-left tracking-[2px]">
          <h3 className="text-xl font-bold uppercase">The town</h3>
          <ul className="mt-2 space-y-1 lg:text-sm ">
            <li>
              <a href="#" className="hover:text-red-500 uppercase ">
                home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 uppercase">
                about
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 uppercase">
                contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 uppercase">
                blog
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center lg:text-left tracking-[2px]">
          <h3 className="text-xl font-bold uppercase">Explorar</h3>
          <ul className="mt-2 space-y-1 lg:text-sm">
            <li>
              <a href="#" className="hover:text-red-500 uppercase">
                faq
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 uppercase">
                imprensa
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 uppercase">
                política de privacidade
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Direitos */}
      <section className="w-screen text-center bg-black/30 px-2 py-4 text-sm">
        <p>Todos os direitos reservados © {year}</p>
      </section>
    </footer>
  );
};
