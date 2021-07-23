import { FC } from "react";

import bethesda from "images/bethesda-softworks.svg";
import valve from "images/valve.svg";
import blizzard from "images/blizzard-entertainment.svg";

import { StyledFooter, StyledNavToolbar, StyledA, StyledFooterTypo, StyledImg } from "./styled";

const Footer: FC = () => {
  const compLogos = [
    {
      id: 1,
      name: "blizzard",
      href: "https://www.blizzard.com/en-us/",
      src: blizzard,
    },
    {
      id: 2,
      name: "bethesda",
      href: "https://bethesda.net/ru/dashboard",
      src: bethesda,
    },
    {
      id: 3,
      name: "valve",
      href: "https://www.valvesoftware.com/en/",
      src: valve,
    },
  ];

  return (
    <div>
      <StyledFooter position="sticky">
        <StyledNavToolbar>
          <StyledFooterTypo variant="h6">Incredible convenient</StyledFooterTypo>
          {compLogos.map((el) => (
            <StyledA key={el.id} href={el.href} target="_blank">
              <StyledImg src={el.src} alt={el.name} />
            </StyledA>
          ))}
        </StyledNavToolbar>
      </StyledFooter>
    </div>
  );
};

export default Footer;
