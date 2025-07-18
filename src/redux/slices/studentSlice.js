import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createStudentAPI,
  updateStudentAPI,
  deleteStudentAPI,
  getAllStudentsAPI,
} from "../../services/allAPI";

export const fetchStudents = createAsyncThunk(
  "student/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllStudentsAPI();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addStudentThunk = createAsyncThunk(
  "student/addStudent",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createStudentAPI(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateStudentThunk = createAsyncThunk(
  "student/updateStudent",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      await updateStudentAPI(id, data);
      return { id, data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteStudentThunk = createAsyncThunk(
  "students/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteStudentAPI(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: {
    studentList: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.studentList = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addStudentThunk.fulfilled, (state, action) => {
        state.studentList.push(action.payload);
      })
      .addCase(updateStudentThunk.fulfilled, (state, action) => {
        const index = state.studentList.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.studentList[index] = {
            ...state.studentList[index],
            ...action.payload.data,
          };
        }
      })
      .addCase(deleteStudentThunk.fulfilled, (state, action) => {
        state.studentList = state.studentList.filter(
          (student) => student._id !== action.payload
        );
      });
  },
});

export default studentSlice.reducer;
