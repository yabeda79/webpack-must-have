import { FC } from "react";
import { useHttp } from "@/hooks/http.hook";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IUser } from "@/redux/initialState";
import { useAuth } from "@/hooks/auth.hook";

import { FormStateType } from "@/main";

interface SignInProps {
  form: FormStateType;
  isSignInOpen?: boolean;
  setIsSignInOpen(value: boolean): void;
  changeHandler(value: React.ChangeEvent<HTMLInputElement>): void;
  children?: React.ReactChild | React.ReactNode;
}

const SignIn: FC<SignInProps> = ({ isSignInOpen, setIsSignInOpen, changeHandler, form }) => {
  if (!isSignInOpen) return null;

  const { loading, request } = useHttp();
  const auth = useAuth();

  const signInHandler = async () => {
    const data: IUser = await request("/api/auth/login", "POST", form);
    auth.login(data);
    setIsSignInOpen(false);
  };

  const closeHandler = () => {
    setIsSignInOpen(false);
  };

  return (
    <div>
      <Dialog open={isSignInOpen} onClose={closeHandler} aria-labelledby="form-dialog-title">
        <DialogTitle id="SignIn">Sign In</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter your email address and password here.</DialogContentText>
          <TextField
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            onChange={changeHandler}
          />
          <TextField
            margin="dense"
            name="password"
            label="Your password"
            type="password"
            fullWidth
            onChange={changeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler} disabled={loading} color="primary">
            Cancel
          </Button>
          <Button onClick={signInHandler} disabled={loading} color="primary">
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignIn;
