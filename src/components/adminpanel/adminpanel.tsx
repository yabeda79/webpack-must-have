import { FC, useEffect, useState } from "react";

import { useHttp } from "@/hooks/http.hook";
// eslint-disable-next-line import/no-cycle
import { IGame } from "@/main";

import { makeStyles, createStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import { Button, FormControl, FormGroup, FormControlLabel, Checkbox, MenuItem, Select } from "@material-ui/core";
import {
  StyledModalWindow,
  StyledGridCon,
  StyledImgCon,
  StyledImg,
  StyledDividerText,
  StyledForm,
  StyledSelectLabel,
} from "./styled";
import AdminConfirm from "../modals/adminconfirm";

interface AdminPanelProp {
  gameId?: number;
  openAdminPanel: boolean;
  setOpenAdminPanel: (value: boolean) => void;
}

interface FormState {
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
  age: number;
  PC: boolean;
  PS: boolean;
  Xbox: boolean;
}

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
    modal_btn: {
      backgroundColor: "purple",
      margin: "15px",
    },
    btn_con: {
      display: "flex",
      width: "100%",
      justifyContent: "flex-end",
    },
    close_btn: {
      backgroundColor: "purple",
      margin: "15px",
      position: "absolute",
      top: "0",
      right: "0",
    },
    formControl_genre: {
      gridColumnStart: "2",
      // marginLeft: "5%",
    },
    formControl: {
      gridColumnStart: "2",
    },
    selectEmpty: {
      marginTop: "10px",
    },
  })
);

const AdminPanel: FC<AdminPanelProp> = ({ gameId, openAdminPanel, setOpenAdminPanel }) => {
  if (!openAdminPanel) return null;

  console.log("gameId ", gameId);

  const classes = useStyles();

  const { request } = useHttp();

  const [form, setForm] = useState<FormState | { PC: boolean; PS: boolean; Xbox: boolean }>({
    PC: false,
    PS: false,
    Xbox: false,
  });
  const [age, setAge] = useState("");
  const [currentGame, setCurrentGame] = useState<IGame>();

  const [isChangeAdminConfirmOpen, setIsChangeAdminConfirmOpen] = useState(false);
  const [isDeleteAdminConfirmOpen, setIsDeleteAdminConfirmOpen] = useState(false);
  const [isCreateAdminConfirmOpen, setIsCreateAdminConfirmOpen] = useState(false);

  const getCurrentGame = async () => {
    const data = await request<IGame>("/api/admin/getGameById", "POST", { id: gameId });
    setCurrentGame(data);
    setForm({ ...data, PC: !!data.PC, PS: !!data.PS, Xbox: !!data.Xbox });
  };

  useEffect(() => {
    getCurrentGame();
  }, []);

  const closePanelHandler = () => {
    setOpenAdminPanel(false);
  };

  const ageHandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
    if (age === "three") setForm({ ...form, age: 3 });
    if (age === "six") setForm({ ...form, age: 6 });
    if (age === "twelve") setForm({ ...form, age: 12 });
    if (age === "eighteen") setForm({ ...form, age: 18 });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const changePCHandler = () => {
    setForm({ ...form, PC: !form.PC });
  };

  const changePSHandler = () => {
    setForm({ ...form, PS: !form.PS });
  };

  const changeXboxHandler = () => {
    setForm({ ...form, Xbox: !form.Xbox });
  };

  const openChangeModalHandler = () => {
    setIsChangeAdminConfirmOpen(true);
  };

  const openDeleteModalHandler = () => {
    setIsDeleteAdminConfirmOpen(true);
  };

  const openCreateModalHandler = () => {
    setIsCreateAdminConfirmOpen(true);
  };

  const createGame = async () => {
    const data = await request<IGame>("/api/admin/createGame", "POST", form);
    setForm({ ...data, PC: !!data.PC, PS: !!data.PS, Xbox: !!data.Xbox });
  };

  const changeGame = async () => {
    const data = await request<IGame>("/api/admin/updateGameInfo", "POST", form);
    setForm({ ...data, PC: !!data.PC, PS: !!data.PS, Xbox: !!data.Xbox });
  };

  const deleteGame = async () => {
    const data = await request<IGame>(`/api/admin/deleteById/${gameId}`, "DELETE", form);
    setOpenAdminPanel(false);
  };

  console.log("adminform", form);

  return (
    <StyledModalWindow>
      <StyledDividerText>Edit card</StyledDividerText>
      <Button
        className={classes.close_btn}
        variant="contained"
        onClick={() => {
          closePanelHandler();
        }}
      >
        Close
      </Button>
      <Divider variant="middle" />
      {currentGame ? (
        <StyledGridCon>
          <StyledImgCon>
            <StyledImg
              src={
                currentGame
                  ? currentGame.image
                  : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
              }
              alt="profile img"
            />
          </StyledImgCon>

          <StyledForm action="">
            <TextField
              className={classes.username_input}
              id="title"
              defaultValue={currentGame ? currentGame.title : "Name"}
              name="title"
              label="Name"
              variant="outlined"
              onChange={changeHandler}
              required
            />
            <TextField
              className={classes.username_input}
              id="category"
              defaultValue={currentGame ? currentGame.genre : "Category"}
              name="category"
              label="Category"
              variant="outlined"
              onChange={changeHandler}
              required
            />
            <TextField
              className={classes.username_input}
              id="price"
              defaultValue={currentGame ? currentGame.price : "Price"}
              name="price"
              label="Price"
              variant="outlined"
              onChange={changeHandler}
              required
            />
            <TextField
              className={classes.username_input}
              id="image"
              defaultValue={currentGame ? currentGame.image : "https://"}
              name="image"
              label="Image"
              variant="outlined"
              onChange={changeHandler}
              required
            />
            <TextField
              className={classes.description_input}
              id="description"
              name="description"
              label="Description"
              multiline
              rows={6}
              defaultValue={currentGame ? currentGame.description : "Description"}
              variant="outlined"
              onChange={changeHandler}
              required
            />
          </StyledForm>
          <StyledSelectLabel>Age</StyledSelectLabel>
          <FormControl className={classes.formControl}>
            <Select
              value={age}
              onChange={ageHandleChange}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}
              variant="outlined"
            >
              <MenuItem value="">Age</MenuItem>
              <MenuItem value="three">3+</MenuItem>
              <MenuItem value="six">6+</MenuItem>
              <MenuItem value="twelve">12+</MenuItem>
              <MenuItem value="eighteen">18+</MenuItem>
            </Select>
          </FormControl>
          <StyledSelectLabel>Platform</StyledSelectLabel>
          <FormControl component="fieldset" className={classes.formControl_genre}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={form.PC} onChange={changePCHandler} name="PC" />}
                label="PC"
              />
              <FormControlLabel
                control={<Checkbox checked={form.PS} onChange={changePSHandler} name="PS" />}
                label="Playstation 5"
              />
              <FormControlLabel
                control={<Checkbox checked={form.Xbox} onChange={changeXboxHandler} name="Xbox" />}
                label="Xbox One"
              />
            </FormGroup>
          </FormControl>
        </StyledGridCon>
      ) : (
        <StyledGridCon>
          <StyledImgCon>
            <StyledImg
              src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
              alt="profile img"
            />
          </StyledImgCon>

          <StyledForm action="">
            <TextField
              className={classes.username_input}
              id="title"
              defaultValue="Name"
              name="title"
              label="Name"
              variant="outlined"
              onChange={changeHandler}
              required
            />
            <TextField
              className={classes.username_input}
              id="category"
              defaultValue="Category"
              name="category"
              label="Category"
              variant="outlined"
              onChange={changeHandler}
              required
            />
            <TextField
              className={classes.username_input}
              id="price"
              defaultValue="Price"
              name="price"
              label="Price"
              variant="outlined"
              onChange={changeHandler}
              required
            />
            <TextField
              className={classes.username_input}
              id="image"
              defaultValue="https://"
              name="image"
              label="Image"
              variant="outlined"
              onChange={changeHandler}
              required
            />
            <TextField
              className={classes.description_input}
              id="description"
              name="description"
              label="Description"
              multiline
              rows={6}
              defaultValue="Description"
              variant="outlined"
              onChange={changeHandler}
              required
            />
          </StyledForm>
          <StyledSelectLabel>Age</StyledSelectLabel>
          <FormControl className={classes.formControl}>
            <Select
              value={age}
              onChange={ageHandleChange}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}
              variant="outlined"
            >
              <MenuItem value="">Age</MenuItem>
              <MenuItem value="three">3+</MenuItem>
              <MenuItem value="six">6+</MenuItem>
              <MenuItem value="twelve">12+</MenuItem>
              <MenuItem value="eighteen">18+</MenuItem>
            </Select>
          </FormControl>
          <StyledSelectLabel>Platform</StyledSelectLabel>
          <FormControl component="fieldset" className={classes.formControl_genre}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={form.PC} onChange={changePCHandler} name="PC" />}
                label="PC"
              />
              <FormControlLabel
                control={<Checkbox checked={form.PS} onChange={changePSHandler} name="PS" />}
                label="Playstation 5"
              />
              <FormControlLabel
                control={<Checkbox checked={form.Xbox} onChange={changeXboxHandler} name="Xbox" />}
                label="Xbox One"
              />
            </FormGroup>
          </FormControl>
        </StyledGridCon>
      )}
      <div className={classes.btn_con}>
        <Button className={classes.modal_btn} variant="contained" onClick={openCreateModalHandler}>
          Create new
        </Button>
        <Button className={classes.modal_btn} variant="contained" onClick={openChangeModalHandler}>
          Submit changes
        </Button>
        <Button className={classes.modal_btn} variant="contained" onClick={openDeleteModalHandler}>
          Delete card
        </Button>
      </div>
      <AdminConfirm
        modalMessage="new game"
        modalType="create"
        isAdminConfirmOpen={isCreateAdminConfirmOpen}
        setIsAdminConfirmOpen={setIsCreateAdminConfirmOpen}
        confimedFunc={createGame}
      />
      <AdminConfirm
        modalMessage={currentGame?.title}
        modalType="change info about"
        isAdminConfirmOpen={isChangeAdminConfirmOpen}
        setIsAdminConfirmOpen={setIsChangeAdminConfirmOpen}
        confimedFunc={changeGame}
      />
      <AdminConfirm
        modalMessage={currentGame?.title}
        modalType="delete"
        isAdminConfirmOpen={isDeleteAdminConfirmOpen}
        setIsAdminConfirmOpen={setIsDeleteAdminConfirmOpen}
        confimedFunc={deleteGame}
      />
    </StyledModalWindow>
  );
};

export default AdminPanel;
