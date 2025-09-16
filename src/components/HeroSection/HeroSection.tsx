import img from "../../assets/images/bannerHeroSection.jpg";
import { Button } from "../UI/Button";

type HeroSectionProps = {
  text: string;
};

export const HeroSection = ({ text }: HeroSectionProps) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center mt-15">
      {/* Imagem de fundo */}
      <img
        src={img}
        alt="Banner Hero Section"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay para escurecer a imagem */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Texto centralizado */}
      <div className="relative z-10 text-3xl text-left font-bold text-white p-2 w-4/5 lg:w-2/5">
        <p className="mb-1 text-sm lg:text-base font-medium">{text}</p>
        <div className="flex items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Digite seu email aqui"
            className="p-2 boider-none rounded-md w-full text-sm lg:text-base font-light text-black bg-white focus:outline-none placeholder:text-black/40"
          />
          <Button
            text="Inscreva se"
            className="bg-primary text-white text-sm lg:text-base font-medium px-4 py-2 flex items-center justify-center rounded-md gap-2 text-nowrap cursor-pointer hover:bg-secondary transition duration-300 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
};
