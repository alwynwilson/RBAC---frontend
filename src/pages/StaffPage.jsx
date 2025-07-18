import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStaff,
  createStaff,
  deleteStaff,
  updateStaff,
} from "../redux/slices/staffSlice";

const StaffPage = () => {
  const dispatch = useDispatch();
  const { staffList } = useSelector((state) => state.staff);
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [tempUser, setTempUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "staff",
    permissions: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
  });

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  const canCreate = user?.role === "superadmin";

  const handleOpenModal = (editData = null) => {
    if (editData) {
      setEditMode(true);
      setSelectedId(editData._id);
      setTempUser({ ...editData});
    } else {
      setEditMode(false);
      setTempUser({
        username: "",
        email: "",
        password: "",
        role: "staff",
        permissions: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
      });
    }
    setOpen(true);
  };

  const handleCloseModal = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setTempUser((prev) => ({
      ...prev,
      permissions: { ...prev.permissions, [name]: checked },
    }));
  };

  const handleSubmit = () => {
    const userToSubmit = { ...tempUser };
    if (editMode) {
      delete userToSubmit.password;
      dispatch(updateStaff({ id: selectedId, updatedStaff: tempUser }));
      setTimeout(()=>window.location.reload(),3000)
    } else {
      if (!userToSubmit.password) {
      alert("Password is required for new staff.");
      return;
    }
    dispatch(createStaff(userToSubmit));
    setTimeout(()=>window.location.reload(),3000)
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteStaff(id));
  };

  if (user?.role !== "superadmin") {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" color="error">
          Unauthorized Access
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Staff Management
      </Typography>

      <Button
        variant="contained"
        onClick={() => handleOpenModal()}
        disabled={!canCreate}
        sx={{ mb: 1 }}
      >
        Create Staff
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Create</TableCell>
            <TableCell>Read</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Delete</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(staffList) &&
            staffList.map((staff) => (
              <TableRow key={staff._id}>
                <TableCell>{staff.username}</TableCell>
                <TableCell>{staff.email}</TableCell>
                {["create", "read", "update", "delete"].map((perm) => (
                  <TableCell key={perm}>
                    <Checkbox checked={staff.permissions?.[perm]} disabled />
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton onClick={() => handleOpenModal(staff)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(staff._id)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleCloseModal} fullWidth>
        <DialogTitle>{editMode ? "Edit Staff" : "Create Staff"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            name="username"
            value={tempUser.username}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            value={tempUser.email}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          {
            editMode?"":<TextField
            label="Password"
            name="password"
            type="password"
            value={tempUser.password}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          }
          
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {["create", "read", "update", "delete"].map((perm) => (
              <FormControlLabel
                key={perm}
                control={
                  <Checkbox
                    name={perm}
                    checked={tempUser.permissions[perm]}
                    onChange={handleCheckboxChange}
                  />
                }
                label={perm.charAt(0).toUpperCase() + perm.slice(1)}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editMode ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StaffPage;