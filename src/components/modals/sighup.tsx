import { FC } from "react";
import { useHttp } from "@/hooks/http.hook";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { FormStateType } from "@/main";

interface SignUpProps {
  form: FormStateType;
  isSignUpOpen?: boolean;
  setIsSignUpOpen(value: boolean): void;
  changeHandler(value: React.ChangeEvent<HTMLInputElement>): void;
}

const SignUp: FC<SignUpProps> = ({ isSignUpOpen, setIsSignUpOpen, changeHandler, form }) => {
  if (!isSignUpOpen) return null;

  const { loading, request } = useHttp();

  const signUpHandler = async () => {
    const data: { message: string } = await request("/api/auth/register", "POST", { ...form });
  };

  const closeHandler = () => {
    setIsSignUpOpen(false);
  };

  return (
    <div>
      <Dialog open={isSignUpOpen} onClose={closeHandler} aria-labelledby="form-dialog-title">
        <DialogTitle id="SignUp">Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter your username, email and password to sign up.</DialogContentText>
          <TextField margin="dense" name="username" label="Username" type="email" fullWidth onChange={changeHandler} />
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
          <Button onClick={signUpHandler} disabled={loading} color="primary">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignUp;
