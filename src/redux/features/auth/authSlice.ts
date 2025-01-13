import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

export interface IUser {
  id: string;
  email: string;
  name: string;
  username: string;
}

export interface IUserState {
  user: IUser | null;
  isLoggedIn: boolean;
}

const initialState: IUserState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null,
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' ? true : false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      state.isLoggedIn = false;
    },
    isLoogedIn: (state) => {
      state.isLoggedIn = true;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export default userSlice.reducer;
