import { FC } from "react";

import Divider from "@material-ui/core/Divider";
import { StyledDividerText, StyledProfCon } from "./styled";

interface ProfProps {
  userName: any;
}

const Profile: FC<ProfProps> = ({ userName }) => {
  return (
    <div>
      <StyledDividerText>{userName} profile page</StyledDividerText>
      <Divider />
      <StyledProfCon></StyledProfCon>
    </div>
  );
};

export default Profile;
