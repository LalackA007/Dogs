import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  name: string;
  breed: string;
  color: string;
}

const initialState: FormState = {
  name: '',
  breed: '',
  color: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData(state, action: PayloadAction<Partial<FormState>>) {
      return { ...state, ...action.payload };
    },
    resetForm() {
      return initialState;
    },
  },
});

export const { setFormData, resetForm } = formSlice.actions;
export default formSlice.reducer;
