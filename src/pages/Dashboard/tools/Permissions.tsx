import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import { useListUsers, useUpdatePermission } from "../../../api/users";
import {
  FormControl,
  Input,
  Select,
  Option,
  Alert,
  IconButton,
} from "@mui/joy";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
const Permissions = () => {
  const { data: rawData, isLoading } = useListUsers();
  const updatePermission = useUpdatePermission();

  const data = Array.isArray(rawData) ? rawData : [];
  const [searchTerm, setSearchTerm] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      valueGetter: (params: GridCellParams) =>
        `${params.row.firstName} ${params.row.lastName}`,
    },
    { field: "userId", headerName: "User ID", width: 250 },
    {
      field: "role",
      headerName: "Current Role",
      width: 150,
      editable: false,
      renderCell: (params: GridCellParams) => (
        <Select
          sx={{ width: 150 }}
          defaultValue={params.value as string}
          onChange={(event, value) => handleRoleChange(params.id, value)}
        >
          <Option value="member">member</Option>
          <Option value="admin">admin</Option>
        </Select>
      ),
    },
  ];
  const handleRoleChange = async (id: any, newValue: string | null) => {
    console.log(`ID: ${id}, New Value: ${newValue}`);

    if (newValue && process.env.REACT_APP_USER_POOL_ID) {
      try {
        await updatePermission.mutateAsync({
          userId: id,
          userRole: newValue,
          userPoolId: process.env.REACT_APP_USER_POOL_ID,
        });

        // Trigger the Alert on success
        setAlertOpen(true);

        // hide after 3 seconds
        setTimeout(() => setAlertOpen(false), 3000);
      } catch (error) {
        setErrorAlertOpen(true);
        setErrorMessage(
          "Error updating permission: " + (error as Error).message
        );

        setTimeout(() => setErrorAlertOpen(false), 5000);
      }
    }
  };
  const filteredData = isLoading
    ? []
    : data.filter(
        (row: {
          firstName: string;
          lastName: string;
          userId: string;
          role: string;
        }) =>
          row.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.role.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <Box sx={{ width: "100%" }}>
      <h1>Permissions</h1>
      <Box
        sx={{
          position: "fixed",
          top: 10, // You can adjust this as needed
          left: "50%",
          transform: "translateX(-50%)", // This will center the box horizontally
          zIndex: 1000, // Ensures the alerts are on top of other elements
        }}
      >
        {alertOpen && (
          <Alert
            variant="soft"
            color="success"
            startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
            endDecorator={
              <IconButton
                variant="plain"
                size="sm"
                color="success"
                onClick={() => setAlertOpen(false)}
              >
                <CloseRoundedIcon />
              </IconButton>
            }
          >
            Permission updated successfully!
          </Alert>
        )}

        {errorAlertOpen && (
          <Alert
            variant="outlined"
            color="danger"
            startDecorator={<AccountCircleRoundedIcon />}
            endDecorator={
              <IconButton
                variant="plain"
                size="sm"
                color="danger"
                onClick={() => setErrorAlertOpen(false)}
              >
                <CloseRoundedIcon />
              </IconButton>
            }
          >
            {errorMessage}
          </Alert>
        )}
      </Box>

      <FormControl style={{ marginBottom: 20, width: "300px" }}>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name"
        />
      </FormControl>

      <DataGrid
        rows={filteredData}
        columns={columns}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        getRowId={(row) => row.userId}
      />
    </Box>
  );
};

export default Permissions;
