import { FC } from "react";
import { useHttp } from "@/hooks/http.hook";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface ChangePass {
  profForm: {};
  setProfForm(value: {}): void;
  isChangePassOpen?: boolean;
  setIsChangePassOpen(value: boolean): void;
}

const ChangePass: FC<ChangePass> = ({ profForm, setProfForm, isChangePassOpen, setIsChangePassOpen }) => {
  if (!isChangePassOpen) return null;

  const { loading, request } = useHttp();

  const chagePassHandler = async () => {
    const data: { message: string } = await request("/api/profile/changepassword", "POST", { ...profForm });
    setIsChangePassOpen(false);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfForm({ ...profForm, [e.target.name]: e.target.value });
  };

  const closeHandler = () => {
    setIsChangePassOpen(false);
  };

  return (
    <div>
      <Dialog open={isChangePassOpen} onClose={closeHandler} aria-labelledby="form-dialog-title">
        <DialogTitle id="Change password">Change password</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter your username, email and password to sign up.</DialogContentText>
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            onChange={changeHandler}
          />
          <TextField
            margin="dense"
            name="newpassword"
            label="New password"
            type="password"
            fullWidth
            onChange={changeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler} disabled={loading} color="primary">
            Cancel
          </Button>
          <Button onClick={chagePassHandler} disabled={loading} color="primary">
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChangePass;
