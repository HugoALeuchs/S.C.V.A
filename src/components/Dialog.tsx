import { useState } from "react";

// Import the components from the Material-UI library
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

// Import the Lottie component
import Lottie from "react-lottie";

// Import the animations
import deleteAnimation from "@public/animations/delete.json";
import warnningAnimation from "@public/animations/warning.json";
import doneAnimation from "@public/animations/done.json";

// Defining the props interface for the AlertDialog component
interface AlertDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  storageID: string;
  updateStorageVolume: (value: number) => void;
  removeStorageByID: (storageID: string) => void;
  isDelete?: boolean;
}

export default function AlertDialog({
  open,
  setOpen,
  storageID,
  updateStorageVolume,
  removeStorageByID,
  isDelete,
}: AlertDialogProps) {
  // State for tracking the "done" status
  const [done, setDone] = useState(false);

  // Function to handle closing the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle the confirmation action
  const handleConfirm = () => {
    setDone(true);

    // Delaying the execution of the action
    setTimeout(() => {
      if (isDelete && storageID) {
        // Removing storage by ID if it's a delete action
        removeStorageByID(storageID);
      } else {
        // Updating storage volume to 0 if it's not a delete action
        updateStorageVolume(0);
      }

      // Resetting "done" and closing the dialog
      setDone(false);
      setOpen(false);
    }, 3000);
  };

  // Options for the default animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: isDelete ? deleteAnimation : warnningAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Options for the done animation
  const doneOptions = {
    loop: false,
    autoplay: true,
    animationData: doneAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Copy for different scenarios
  const copy = {
    collect: {
      title: "Pedido de coleta",
      message: (
        <>
          <p>
            Devido ao alto volume de resíduos, um pedido de coleta foi criado
            para esse armazem.
          </p>
          <p>Deseja confirmar a coleta?</p>
        </>
      ),
    },
    delete: {
      title: "Remover Armazem",
      message: (
        <>
          <p>Deseja realmente remover esse armazem?</p>
          <p>Essa ação não poderá ser desfeita.</p>
        </>
      ),
    },
  };

  return (
    <Dialog open={open} keepMounted onClose={handleClose}>
      <DialogTitle>
        {isDelete ? copy.delete.title : copy.collect.title}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minWidth: { xs: "300px", lg: "600px" },
        }}
      >
        {!done ? (
          <>
            <DialogContentText>
              {isDelete ? copy.delete.message : copy.collect.message}
            </DialogContentText>
            <Lottie
              style={{
                position: "absolute",
                margin: "0",
                top: "10px",
                right: "10px",
              }}
              options={defaultOptions}
              height={50}
              width={50}
            />
          </>
        ) : (
          <>
            <Lottie width={140} height={140} options={doneOptions} />
            <p style={{ margin: 0, textAlign: "center" }}>
              Ação realizada com sucesso!
            </p>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={done}>
          Cancelar
        </Button>
        <Button onClick={handleConfirm} disabled={done}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
