import React, { useEffect, useState } from "react";

// Import the components from the Material-UI library
import {
  Box,
  Card as MUICard,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";

// Import the custom components
import Chart from "./PieChart";
import NumberInput from "./NumberInput";
import AlertDialog from "./Dialog";

// Import the WasteStorage interface and the updateStorageByID function
import { WasteStorage } from "../interfaces/WasteStorageInterface";
import { updateStorageByID } from "../__mocks__/mock";

interface CardProps {
  storage: WasteStorage;
  setStorages: React.Dispatch<React.SetStateAction<WasteStorage[]>>;
}

export default function Card({ storage, setStorages }: CardProps) {
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    // Open the dialog if storage volume used is greater than or equal to 80
    if (storage.storageVolumeUsed >= 80) {
      setOpen(true);
    }
  }, []);

  // Function to handle the change in storage volume used
  const handleStorageVolumeUsedChange = (value: number) => {
    const updatedStorage: WasteStorage = {
      ...storage,
      storageVolumeUsed: value,
      storageVolumeFree: storage.storageVolume - value,
    };
    updateStorageByID(storage.storageID, updatedStorage);
    setStorages((storages) =>
      storages.map((s) =>
        s.storageID === storage.storageID ? updatedStorage : s
      )
    );
  };

  // Function to handle the removal of storage by ID
  const handleRemoveStorageByID = (storageID: string) => {
    setStorages((storages) =>
      storages.filter((s) => s.storageID !== storageID)
    );
  };

  return (
    <>
      {/* Dialog component */}
      <AlertDialog
        open={open}
        setOpen={setOpen}
        isDelete={isDelete}
        storageID={storage.storageID}
        updateStorageVolume={handleStorageVolumeUsedChange}
        removeStorageByID={handleRemoveStorageByID}
      />
      <MUICard
        sx={{
          "&:hover": {
            transform: "scale(1.01)",
            transition: "transform 0.3s ease",
          },
          transition: "transform 0.3s ease",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Storage name */}
              <Typography
                sx={{ marginLeft: "auto" }}
                variant="h5"
                component="div"
                textAlign="center"
              >
                {storage.storageName}
              </Typography>
              {/* Delete button */}
              <Tooltip title={"Remover"} placement="top" arrow>
                <IconButton
                  sx={{
                    marginLeft: storage.storageVolumeUsed >= 80 ? "8%" : "20%",
                  }}
                  component="button"
                  onClick={() => {
                    setIsDelete(true);
                    setOpen(true);
                  }}
                >
                  <DeleteOutline />
                </IconButton>
              </Tooltip>
              {/* Move to inbox button */}
              {storage.storageVolumeUsed >= 80 && (
                <Tooltip title={"Pedido de coleta"} placement="top" arrow>
                  <IconButton onClick={() => setOpen(true)}>
                    <MoveToInboxIcon sx={{ color: "red" }} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
            {/* Pie chart */}
            <Chart
              free={storage.storageVolumeFree}
              used={storage.storageVolumeUsed}
            />
            {/* Update volume label */}
            <Typography variant="body1" textAlign="center" pb={1}>
              Atualizar volume utilizado
            </Typography>
            {/* Number input */}
            <NumberInput
              value={storage.storageVolumeUsed}
              onChange={handleStorageVolumeUsedChange}
            />
          </Box>
        </CardContent>
      </MUICard>
    </>
  );
}
