import { FC } from "react";

import { StyledFooter, StyledNavToolbar, StyledA, StyledFooterTypo, StyledImg } from "./styled";

import bethesda from "images/bethesda-softworks.svg";
import valve from "images/valve.svg";
import blizzard from "images/blizzard-entertainment.svg";

const Footer: FC = () => {
  const compLogos = [
    {
      name: "blizzard",
      href: "https://www.blizzard.com/en-us/",
      src: blizzard,
    },
    {
      name: "bethesda",
      href: "https://bethesda.net/ru/dashboard",
      src: bethesda,
    },
    {
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
          {compLogos.map((el, ind) => {
            return (
              <StyledA key={ind} href={el.href} target="_blank">
                <StyledImg src={el.src} alt="blizzard" />
              </StyledA>
            );
          })}
        </StyledNavToolbar>
      </StyledFooter>
    </div>
  );
};

export default Footer;
