import { FC, useEffect, useState } from "react";

import { useHttp } from "@/hooks/http.hook";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import ChangePass from "../modals/changepass";
import {
  StyledDividerText,
  StyledProfCon,
  StyledFormCon,
  StyledForm,
  StyledImgCon,
  StyledImg,
  StyledButton,
  StyledBtnCon,
  StyledChangeButton,
} from "./styled";

import { FormStateType } from "@/main";

interface ProfProps {
  userName: string | undefined;
  form: FormStateType;
  setForm: (username: string, email: string, password: string) => void;
}

interface IProfile {
  userId: string | null;
  email: string;
  description: string | null;
}

// type Profiles = IProfile | undefined;

const useStyles = makeStyles(() =>
  createStyles({
    username_input: {
      width: "100%",
      padding: "0",
      margin: "20px 0",
    },
    description_input: {
      width: "100%",
      padding: "0",
      margin: "20px 0",
    },
  })
);

const Profile: FC<ProfProps> = ({ userName }) => {
  const classes = useStyles();

  const [profForm, setProfForm] = useState({ email: "", username: userName });
  const [profileInfo, setProfileInfo] = useState<IProfile>();
  const [check, setCheck] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [isChangePassOpen, setIsChangePassOpen] = useState(false);

  const { loading, request } = useHttp();

  const getProfile = async () => {
    const data = await request<IProfile>("/api/profile/info", "POST", { ...profForm });
    console.log("data", data);
    setProfForm({ ...profForm, email: data.email });
    setProfileInfo(data);
  };

  useEffect(() => {
    getProfile();
  }, []);
  useEffect(() => {
    setShowForm(!showForm);
  }, [loading]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfForm({ ...profForm, [e.target.name]: e.target.value });
  };

  const saveHandler = async () => {
    const data: { message: string } = await request("/api/profile/save", "POST", { ...profForm });
    setCheck(data);
  };

  const showModal = () => {
    setIsChangePassOpen(true);
  };

  console.log("Check: ", check);
  console.log(profileInfo);
  return (
    <div>
      <StyledDividerText>{userName} profile page</StyledDividerText>
      <Divider />
      <StyledProfCon>
        <StyledImgCon>
          <StyledImg
            src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
            alt="profile img"
          />
          <StyledButton disabled={loading}>Change profile picture</StyledButton>
        </StyledImgCon>
        <StyledFormCon onChange={changeHandler}>
          {showForm ? (
            <StyledForm action="">
              <TextField
                className={classes.username_input}
                id="outlined-basic"
                // id="outlined-multiline-static"
                defaultValue={profileInfo.userId ? profileInfo.userId : userName}
                name="username"
                label="Username"
                variant="outlined"
                required
              />
              <TextField
                className={classes.description_input}
                id="outlined-multiline-static"
                name="description"
                label="Description"
                multiline
                rows={6}
                defaultValue={profileInfo.description}
                variant="outlined"
                required
              />
            </StyledForm>
          ) : null}
        </StyledFormCon>
        <StyledBtnCon>
          <StyledChangeButton onClick={saveHandler} disabled={loading}>
            Save profile
          </StyledChangeButton>
          <StyledChangeButton onClick={showModal} disabled={loading}>
            Change password
          </StyledChangeButton>
        </StyledBtnCon>
      </StyledProfCon>
      <ChangePass
        profForm={profForm}
        setProfForm={setProfForm}
        isChangePassOpen={isChangePassOpen}
        setIsChangePassOpen={setIsChangePassOpen}
      />
    </div>
  );
};

export default Profile;
