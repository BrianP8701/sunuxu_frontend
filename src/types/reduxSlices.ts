// types/app.ts
export interface AppSlice {
    current_page: string;
}

export interface UserSlice {
    id: number;
    email: string;
    phone: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    user_type: string;
}

export interface DataSlice {
    current_data_table: "people" | "properties" | "transactions";

    include_transactions_types: { [key: string]: boolean };
    include_transactions_statuses: { [key: string]: boolean };
    include_transactions_columns: { [key: string]: boolean };
    transactions_sort_by: "viewed" | "created" | "updated";
    transactions_sort_direction: "new" | "old";
    transactions_page_size: number;
    transactions_current_page: number;
    transactions_total_items: number;
    transactions_total_pages: number;
    all_transactions: { [key: string]: string }; // transaction names to ids

    include_people_types: { [key: string]: boolean };
    include_people_statuses: { [key: string]: boolean };
    include_people_columns: { [key: string]: boolean };
    people_sort_by: "viewed" | "created" | "updated";
    people_sort_direction: "new" | "old";
    people_page_size: number;
    people_current_page: number;
    people_total_items: number;
    people_total_pages: number;
    all_people: { [key: string]: string }; // person names to ids

    include_properties_types: { [key: string]: boolean };
    include_properties_statuses: { [key: string]: boolean };
    include_properties_columns: { [key: string]: boolean };
    properties_sort_by: "viewed" | "created" | "updated";
    properties_sort_direction: "new" | "old";
    properties_page_size: number;
    properties_current_page: number;
    properties_total_items: number;
    properties_total_pages: number;
    all_properties: { [key: string]: string }; // property addresses to ids

    refresh_table_data_flag: boolean;
}

export interface PaperworkSlice {
    editor_current_file: string | File | null;
}