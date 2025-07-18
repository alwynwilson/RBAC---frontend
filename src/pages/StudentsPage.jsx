import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStudents,
  addStudentThunk,
  updateStudentThunk,
  deleteStudentThunk,
} from "../redux/slices/studentSlice";
import { loginSuccess } from "../redux/slices/authSlice";

const initialForm = {
  id: null,
  name: "",
  age: "",
  grade: "",
  contact: "",
};

const StudentsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);
  const [info, setInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { studentList } = useSelector((state) => state.student);

  const role = user?.role;
  console.log(role);
  const permissions = user?.permissions || {};
  console.log(permissions);

  if (role === "superadmin") {
    var isSuperadmin = "superadmin";
  }

  const canCreate = isSuperadmin || permissions?.create;
  const canEdit = isSuperadmin || permissions?.update;
  const canDelete = isSuperadmin || permissions?.delete;

  const handleOpenModal = (student = null) => {
    if (!canCreate) {
      setInfo("You don't have permission to create students");
      return;
    }

    if (student) {
      setForm(student);
      setIsEditing(true);
    } else {
      setForm(initialForm);
      setIsEditing(false);
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setForm(initialForm);
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await dispatch(updateStudentThunk({ id: form.id, data: form }));
      } else {
        await dispatch(addStudentThunk(form));
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting student data", error);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteStudentThunk(id));
  };

  const loadStudents = async () => {
    try {
      await dispatch(fetchStudents());
    } catch (err) {
      console.error("Failed to fetch students", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      dispatch(loginSuccess({ user: storedUser, token }));
      loadStudents();
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Typography variant="h5">Student Management</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {canCreate ? (
            <Button
              variant="contained"
              onClick={() => handleOpenModal()}
              sx={{ mb: 0.5 }}
            >
              Create Student
            </Button>
          ) : (
            <Tooltip title="You don't have permission to create students">
              <span>
                <Button variant="contained" disabled sx={{ mb: 0.5 }}>
                  Create Student
                </Button>
              </span>
            </Tooltip>
          )}

          {!canCreate && (
            <Typography
              variant="caption"
              sx={{ color: "red", fontWeight: "bold" }}
            >
              Contact Admin
            </Typography>
          )}
        </Box>
      </Box>

      {info && (
        <Alert severity="info" onClose={() => setInfo("")} sx={{ mb: 2 }}>
          {info}
        </Alert>
      )}

      {isLoading ? (
        <Typography variant="body1" color="text.secondary">
          Loading students...
        </Typography>
      ) : studentList?.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No students found.
        </Typography>
      ) : (
        <Box
          sx={{
            backgroundColor: "#f9f9f9",
            p: 2,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={thStyle}>Full Name</th>
                <th style={thStyle}>Age</th>
                <th style={thStyle}>Grade</th>
                <th style={thStyle}>Contact Number</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentList?.map((student) => (
                <tr key={student._id}>
                  <td style={tdStyle}>{student.name}</td>
                  <td style={tdStyle}>{student.age}</td>
                  <td style={tdStyle}>{student.grade}</td>
                  <td style={tdStyle}>{student.contact}</td>
                  <td style={tdStyle}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <EditIcon
                        color={canEdit ? "primary" : "disabled"}
                        sx={{ cursor: canEdit ? "pointer" : "not-allowed" }}
                        onClick={() => canEdit && handleOpenModal(student)}
                      />
                      <DeleteIcon
                        color={canDelete ? "error" : "disabled"}
                        sx={{ cursor: canDelete ? "pointer" : "not-allowed" }}
                        onClick={() => canDelete && handleDelete(student._id)}
                      />
                    </Box>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}

      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {isEditing ? "Edit Student" : "Create Student"}
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        >
          <TextField
            name="name"
            label="Full Name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="age"
            label="Age"
            type="number"
            value={form.age}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="grade"
            label="Grade"
            value={form.grade}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="contact"
            label="Contact Number"
            value={form.contact}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {isEditing ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const thStyle = {
  borderBottom: "1px solid #ccc",
  padding: "12px",
  textAlign: "left",
  backgroundColor: "#eee",
};

const tdStyle = {
  borderBottom: "1px solid #ddd",
  padding: "10px",
};

export default StudentsPage;
