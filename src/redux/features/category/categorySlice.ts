import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

export interface ICategory {
  masterCategory: string;
  subCategory: string;
}

export interface ICategoryState {
  all: ICategory[];
  masterSelected: string;
  subSelected: string;
  subList: string[];
  masterList: string[];
}

const initialState: ICategoryState = {
  all: [],
  masterSelected: '',
  subSelected: '',
  subList: [],
  masterList: []
};

const setSubListByMaster = (master: string, all: ICategory[]) => {
  if (master === '') {
    return Array.from(new Set(all.map((category) => category.subCategory)));
  }
  return Array.from(
    new Set(
      all
        .filter((category) => category.masterCategory === master)
        .map((category) => category.subCategory)
    )
  );
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    loadAllCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.all = action.payload;
      state.masterList = Array.from(
        new Set(action.payload.map((category) => category.masterCategory))
      );
      if (state.masterSelected === 'all') {
        state.subList = Array.from(
          new Set(action.payload.map((category) => category.subCategory))
        );
      } else {
        const isNotChangeMasterSelect = state.masterList.includes(
          state.masterSelected
        );
        if (!isNotChangeMasterSelect) {
          state.masterSelected = 'all';
          state.subList = Array.from(
            new Set(action.payload.map((category) => category.subCategory))
          );
        } else {
          state.subList = Array.from(
            new Set(
              action.payload
                .filter(
                  (category) => category.masterCategory === state.masterSelected
                )
                .map((category) => category.subCategory)
            )
          );
        }
      }
    },

    selectMasterCategory: (state, action: PayloadAction<string>) => {
      state.masterSelected = action.payload;
      state.subSelected = '';
      state.subList = setSubListByMaster(action.payload, state.all);
    },

    selectSubCategory: (state, action: PayloadAction<string>) => {
      state.subSelected = action.payload;
    }
  }
});
export default categorySlice.reducer;
export const { loadAllCategories, selectMasterCategory, selectSubCategory } =
  categorySlice.actions;
export const getCategoryState = (state: RootState) => state.categories;
