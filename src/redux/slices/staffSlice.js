import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllStaffAPI, createStaffAPI, updateStaffAPI, deleteStaffAPI } from '../../services/allAPI';

export const fetchStaff = createAsyncThunk("staff/fetchStaff", async () => {
  const res = await getAllStaffAPI();
  return res.data;
});

export const createStaff = createAsyncThunk("staff/createStaff", async (newStaff) => {
  const res = await createStaffAPI(newStaff);
  return res.data;
});

export const updateStaff = createAsyncThunk("staff/updateStaff", async ({ id, updatedStaff }) => {
  const res = await updateStaffAPI(id, updatedStaff);
  return res.data;
});

export const deleteStaff = createAsyncThunk("staff/deleteStaff", async (id) => {
  await deleteStaffAPI(id);
  return id;
});

const staffSlice = createSlice({
  name: 'staff',
  initialState: {
    staffList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state) => { state.loading = true; })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.staffList = action.payload;
        state.loading = false;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.staffList.push(action.payload);
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        const index = state.staffList.findIndex(s => s._id === action.payload._id);
        if (index !== -1) state.staffList[index] = action.payload;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.staffList = state.staffList.filter(s => s._id !== action.payload);
      });
  }
});

export default staffSlice.reducer;
