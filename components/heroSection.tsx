import React, { ReactNode } from "react";

interface HeroImage {
  src: string;
  alt: string;
  width: number;
  position: string;
  rotate?: string;
}

interface HeroButton {
  text: string;
  onClick: () => void;
  icon?: ReactNode;
  bgColor: string;
  hoverBgColor: string;
}

interface BounceButton {
  onClick: () => void;
  icon: ReactNode;
}

interface HeroSectionProps {
  backgroundEffect?: boolean;
  images?: HeroImage[];
  title?: string;
  subtitle?: string;
  buttons?: HeroButton[];
  footerText?: string;
  bounceButton?: BounceButton;
  containerClass?: string;
  contentWidth?: string;
  titleClass?: string;
  subtitleClass?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundEffect = true,
  images = [],
  title,
  subtitle,
  buttons = [],
  footerText,
  bounceButton,
  containerClass = "h-[80vh] p-4 relative mt-5 overflow-hidden flex flex-col justify-start items-center rounded-3xl",
  contentWidth = "w-1/3",
  titleClass = "md:text-lg text-sm font-medium leading-[23px] tracking-tight mt-9 text-black uppercase",
  subtitleClass = "md:text-3xl text-2xl font-bold mt-8 capitalize",
}) => {
  return (
    <div className={containerClass}>
      {backgroundEffect && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#ecd4c5]/30 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)]"></div>
      )}

      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute -z-10 ${img.position}`}
          style={img.rotate ? { transform: `rotate(${img.rotate})` } : {}}
        >
          <img src={img.src} alt={img.alt} width={img.width} />
        </div>
      ))}

      <div className="w-full flex flex-col items-center justify-center mt-64">
        <div className={`inline-flex flex-col items-start justify-start mx-auto ${contentWidth}`}>
          {title && <div className={titleClass}>{title}</div>}
          {subtitle && <div className={subtitleClass}>{subtitle}</div>}
        </div>
      </div>

      <div className={`absolute bottom-10 w-full flex ${bounceButton ? 'flex-col' : 'flex-row'} items-center justify-center gap-5 mt-10`}>
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            className={`flex items-center gap-2 ${button.bgColor} hover:${button.hoverBgColor} text-white px-6 py-3 rounded-lg shadow-md transition-colors duration-300`}
          >
            {button.icon && <span className="w-5 h-5">{button.icon}</span>}
            {button.text}
          </button>
        ))}

        {footerText && (
          <p className="md:text-lg text-sm font-medium tracking-tight text-black text-center capitalize">
            {footerText}
          </p>
        )}

        {bounceButton && (
          <button
            onClick={bounceButton.onClick}
            className="cursor-pointer bg-[#6A8D73] px-3 py-2 rounded-md text-white tracking-wider shadow-xl animate-bounce hover:animate-none"
          >
            {bounceButton.icon}
          </button>
        )}
      </div>
    </div>
  );
};

export default HeroSection;