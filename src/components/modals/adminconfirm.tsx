import { FC } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

interface AdminConfirmProps {
  modalMessage: string | undefined;
  modalType: string;
  isAdminConfirmOpen: boolean;
  setIsAdminConfirmOpen(value: boolean): void;
  confimedFunc: () => void;
}

const AdminConfirm: FC<AdminConfirmProps> = ({
  modalMessage,
  modalType,
  isAdminConfirmOpen,
  setIsAdminConfirmOpen,
  confimedFunc,
}) => {
  if (!isAdminConfirmOpen) return null;

  const closeHandler = () => {
    setIsAdminConfirmOpen(false);
  };

  return (
    <div>
      <Dialog open={isAdminConfirmOpen} onClose={closeHandler} aria-labelledby="form-dialog-title">
        <DialogTitle id="message">
          Are you really want to {modalType} {modalMessage}?
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeHandler} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              confimedFunc();
              closeHandler();
            }}
            color="primary"
          >
            {modalType}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminConfirm;
