import { FC } from "react";

import { StyledFooter, StyledNavToolbar, StyledA, StyledFooterTypo, StyledImg } from "./styled";

import bethesda from "images/bethesda-softworks.svg";
import valve from "images/valve.svg";
import blizzard from "images/blizzard-entertainment.svg";

const Footer: FC = () => {
  return (
    <div>
      <StyledFooter position="sticky">
        <StyledNavToolbar>
          <StyledFooterTypo variant="h6">Incredible convenient</StyledFooterTypo>
          <StyledA href="https://www.blizzard.com/en-us/" target="_blank">
            <StyledImg src={blizzard} alt="blizzard" />
          </StyledA>
          <StyledA href="https://bethesda.net/ru/dashboard" target="_blank">
            <StyledImg src={bethesda} alt="bethesda" />
          </StyledA>
          <StyledA href="https://www.valvesoftware.com/en/" target="_blank">
            <StyledImg src={valve} alt="valve" />
          </StyledA>
        </StyledNavToolbar>
      </StyledFooter>
    </div>
  );
};

export default Footer;
