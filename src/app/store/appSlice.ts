"use client";
// app/store/appSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { App } from "@/types/app";

const initialState: App = {
  current_page: "signin",
  current_crm_tab: "people",

  transactions_table_filters: {
    pending: true,
    success: true,
    failed: true,
  },
  transactions_table_sort: "viewed",
  transactions_table_sort_direction: "asc",
  transactions_table_page_size: 10,
  transactions_table_current_page: 1,
  transactions_table_total_pages: 1,

  people_table_filters: {
    prospect: true,
    lead: true,
    client: true,
    past_client: true,
    agent: true,
    broker: true,
    attorney: true,
    lender: true
  },
  people_table_sort: "viewed",
  people_table_sort_direction: "asc",
  people_table_page_size: 10,
  people_table_current_page: 1,
  people_table_total_pages: 1,

  properties_table_filters: {
    residential: true,
    condo: true,
    coop: true,
    commercial: true,
    land: true,
    hoa: true,
    industrial: true,
    rental: true
  },
  properties_table_sort: "viewed",
  properties_table_sort_direction: "asc",
  properties_table_page_size: 10,
  properties_table_current_page: 1,
  properties_table_total_pages: 1,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.current_page = action.payload;
    },
    setPropertiesTableFilters: (state, action: PayloadAction<typeof initialState.properties_table_filters>) => {
      state.properties_table_filters = action.payload;
    },
    setPropertiesTableSort: (state, action: PayloadAction<string>) => {
      state.properties_table_sort = action.payload;
    },
    setPropertiesTableSortDirection: (state, action: PayloadAction<App["properties_table_sort_direction"]>) => {
      state.properties_table_sort_direction = action.payload;
    },
    setPropertiesTablePageSize: (state, action: PayloadAction<number>) => {
      state.properties_table_page_size = action.payload;
    },
    setCurrentCrmTab: (state, action: PayloadAction<App["current_crm_tab"]>) => {
      state.current_crm_tab = action.payload;
    },
    resetAppState: (state) => {
      console.log("resetting app state to initial state" + JSON.stringify(initialState));
      Object.keys(initialState).forEach(key => {
        (state as any)[key] = initialState[key as keyof App];
      });
    },
  },
});

export const { setCurrentPage, setPropertiesTableFilters, resetAppState, setPropertiesTableSort, setCurrentCrmTab, setPropertiesTableSortDirection, setPropertiesTablePageSize } = appSlice.actions;
export default appSlice.reducer;
