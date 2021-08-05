import { FC } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface ConfirmProps {
  isConfirmBuyOpen?: boolean;
  setIsConfirmBuyOpen(value: boolean): void;
}

const ConfirmBuy: FC<ConfirmProps> = ({ isConfirmBuyOpen, setIsConfirmBuyOpen }) => {
  if (!isConfirmBuyOpen) return null;

  const closeHandler = () => {
    setIsConfirmBuyOpen(false);
  };

  const buyHandler = () => {
    alert("got it");
    setIsConfirmBuyOpen(false);
  };

  return (
    <div>
      <Dialog open={isConfirmBuyOpen} onClose={closeHandler} aria-labelledby="form-dialog-title">
        <DialogTitle id="Change password">Change password</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler} color="primary">
            Cancel
          </Button>
          <Button onClick={buyHandler} color="primary">
            Buy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmBuy;
