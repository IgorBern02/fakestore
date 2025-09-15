type HeroSectionProps = {
  text: string;
};

export const HeroSection = ({ text }: HeroSectionProps) => {
  return (
    <div className="text-center bg-amber-400 p-4 text-white">
      <h1>{text}</h1>
    </div>
  );
};
