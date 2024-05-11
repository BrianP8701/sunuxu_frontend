"use client";
// app/store/appSlice.ts
import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import { App } from "@/types/app";

const initialState: App = {
  current_page: "signin",
  current_crm_tab: "people",

  include_transactions_types: {
    sale: true,
    rent: true,
    lease: true,
    buy: true,
    other: true,
    unknown: true
  },
  include_transactions_statuses: {
    closed: true,
    pending: true,
    expired: true,
    withdrawn: true,
    off_market: true
  },
  transactions_sort_by: "viewed",
  transactions_sort_direction: "new",
  transactions_page_size: 15,
  transactions_current_page: 1,
  transactions_total_items: 0,
  transactions_total_pages: 0,
  all_transactions: {},

  include_people_types: {
    prospect: true,
    lead: true,
    client: true,
    past_client: true,
    agent: true,
    broker: true,
    attorney: true,
    other: true,
    unknown: true
  },
  include_people_statuses: {
    active: true,
    inactive: true
  },
  people_sort_by: "viewed",
  people_sort_direction: "new",
  people_page_size: 15,
  people_current_page: 1,
  people_total_items: 0,
  people_total_pages: 0,
  all_people: {},
  include_properties_types: {
    residential: true,
    condo: true,
    coop: true,
    commercial: true,
    land: true,
    hoa: true,
    industrial: true,
    rental: true,
    other: true,
    unknown: true
  },
  include_properties_statuses: {
    active: true,
    inactive: true
  },
  properties_sort_by: "viewed",
  properties_sort_direction: "new",
  properties_page_size: 15,
  properties_current_page: 1,
  properties_total_items: 0,
  properties_total_pages: 0,
  all_properties: {},

  refresh_table_data_flag: false
};

const resetAppState = createAction('app/resetAppState', () => {
  console.log("Preparing to reset app state to initial state");
  return { payload: initialState };
});

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.current_page = action.payload;
    },
    setIncludePropertiesTableTypes: (state, action: PayloadAction<typeof initialState.include_properties_types>) => {
      state.include_properties_types = action.payload;
    },
    setIncludePropertiesTableStatuses: (state, action: PayloadAction<typeof initialState.include_properties_statuses>) => {
      state.include_properties_statuses = action.payload;
    },
    setPropertiesSortBy: (state, action: PayloadAction<"viewed" | "created" | "updated">) => {
      state.properties_sort_by = action.payload;
    },
    setPropertiesSortDirection: (state, action: PayloadAction<App["properties_sort_direction"]>) => {
      state.properties_sort_direction = action.payload;
    },
    setPropertiesPageSize: (state, action: PayloadAction<number>) => {
      state.properties_page_size = action.payload;
    },
    setCurrentCrmTab: (state, action: PayloadAction<App["current_crm_tab"]>) => {
      state.current_crm_tab = action.payload;
    },
    setPropertiesCurrentPage: (state, action: PayloadAction<number>) => {
      console.log("Setting properties_current_page to", action.payload);
      state.properties_current_page = action.payload;
    },
    setIncludePeopleTableTypes: (state, action: PayloadAction<typeof initialState.include_people_types>) => {
      state.include_people_types = action.payload;
    },
    setIncludePeopleTableStatuses: (state, action: PayloadAction<typeof initialState.include_people_statuses>) => {
      state.include_people_statuses = action.payload;
    },
    setPeopleSortBy: (state, action: PayloadAction<"viewed" | "created" | "updated">) => {
      state.people_sort_by = action.payload;
    },
    setPeopleSortDirection: (state, action: PayloadAction<App["people_sort_direction"]>) => {
      state.people_sort_direction = action.payload;
    },
    setPeoplePageSize: (state, action: PayloadAction<number>) => {
      state.people_page_size = action.payload;
    },
    setPeopleCurrentPage: (state, action: PayloadAction<number>) => {
      console.log("Setting people_current_page to", action.payload);
      state.people_current_page = action.payload;
    },
    setTransactionsCurrentPage: (state, action: PayloadAction<number>) => {
      console.log("Setting transactions_current_page to", action.payload);
      state.transactions_current_page = action.payload;
    },
    setIncludeTransactionsTableTypes: (state, action: PayloadAction<typeof initialState.include_transactions_types>) => {
      state.include_transactions_types = action.payload;
    },
    setIncludeTransactionsTableStatuses: (state, action: PayloadAction<typeof initialState.include_transactions_statuses>) => {
      state.include_transactions_statuses = action.payload;
    },
    setTransactionsSortBy: (state, action: PayloadAction<"viewed" | "created" | "updated">) => {
      state.transactions_sort_by = action.payload;
    },
    setTransactionsSortDirection: (state, action: PayloadAction<App["transactions_sort_direction"]>) => {
      state.transactions_sort_direction = action.payload;
    },
    setTransactionsPageSize: (state, action: PayloadAction<number>) => {
      state.transactions_page_size = action.payload;
    },
    refreshTableData: (state) => {
      state.refresh_table_data_flag = !state.refresh_table_data_flag;
    },
    setPropertiesTotalItems: (state, action: PayloadAction<number>) => {
      state.properties_total_items = action.payload;
    },
    setPropertiesTotalPages: (state, action: PayloadAction<number>) => {
      state.properties_total_pages = action.payload;
    },
    setPeopleTotalItems: (state, action: PayloadAction<number>) => {
      state.people_total_items = action.payload;
    },
    setPeopleTotalPages: (state, action: PayloadAction<number>) => {
      state.people_total_pages = action.payload;
    },
    setTransactionsTotalItems: (state, action: PayloadAction<number>) => {
      state.transactions_total_items = action.payload;
    },
    setTransactionsTotalPages: (state, action: PayloadAction<number>) => {
      state.transactions_total_pages = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(resetAppState, (state, action) => {
      return action.payload; // This ensures the state is replaced
    });
  }
});

export const {
  setCurrentPage, setIncludePropertiesTableTypes,
  setIncludePropertiesTableStatuses, setPropertiesSortBy,
  setPropertiesSortDirection, setPropertiesPageSize,
  setCurrentCrmTab, setPeopleCurrentPage, setTransactionsCurrentPage,
  setPropertiesCurrentPage, setPeopleSortBy, setPeopleSortDirection,
  setPeoplePageSize, setIncludePeopleTableTypes, setIncludePeopleTableStatuses,
  setTransactionsSortBy, setTransactionsSortDirection, setTransactionsPageSize,
  setIncludeTransactionsTableTypes, setIncludeTransactionsTableStatuses,
  refreshTableData, setPropertiesTotalItems, setPropertiesTotalPages,
  setPeopleTotalItems, setPeopleTotalPages, setTransactionsTotalItems,
  setTransactionsTotalPages
} = appSlice.actions;
export default appSlice.reducer;
export { resetAppState };

