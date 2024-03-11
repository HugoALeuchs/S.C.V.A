import React, { useEffect, useState } from "react";

// Import the components from the Material-UI library
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// Import the custom components
import Header from "../src/components/Header";
import Card from "../src/components/Card";

// Import the WasteStorage interface and the getAllStorages function
import { WasteStorage } from "../src/interfaces/WasteStorageInterface";
import { getAllStorages } from "../src/__mocks__/mock";

export default function Home() {
  const [storages, setStorages] = useState<WasteStorage[]>([]);

  useEffect(() => {
    // Fetch all storages from the mock API
    setStorages(getAllStorages());
  }, []);

  const handleAddStorage = () => {
    // Create a new storage object
    const newStorage: WasteStorage = {
      storageID: (storages.length + 1).toString(),
      storageName: `Armazem ${storages.length + 1}`,
      storageVolume: 100,
      storageVolumeUsed: 0,
      storageVolumeFree: 100,
    };
    // Add the new storage to the list of storages
    setStorages((prevStorages) => [...prevStorages, newStorage]);
  };

  const handleRemoveStorage = () => {
    // Remove the last storage from the list of storages
    setStorages((prevStorages) => prevStorages.slice(0, -1));
  };

  return (
    <>
      {/* Render the header component */}
      <Header
        onAddStorage={handleAddStorage}
        onRemoveStorage={handleRemoveStorage}
      />
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={3} mt={2}>
            {/* Render a Card component for each storage */}
            {storages.map((storage) => (
              <Grid item xs={12} sm={6} md={4} key={storage.storageID}>
                <Card storage={storage} setStorages={setStorages} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
