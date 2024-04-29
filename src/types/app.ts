// types/app.ts
export interface App {
    current_page: string;
 
    current_crm_tab: "people" | "properties" | "transactions";

    transactions_table_filters: { [key: string]: boolean };
    transactions_table_sort: string;
    transactions_table_sort_direction: "asc" | "desc";
    transactions_table_page_size: number;
    transactions_table_current_page: number;
    transactions_table_total_pages: number;

    people_table_filters: { [key: string]: boolean };
    people_table_sort: string;
    people_table_sort_direction: "asc" | "desc";
    people_table_page_size: number;
    people_table_current_page: number;
    people_table_total_pages: number;

    properties_table_filters: { [key: string]: boolean };
    properties_table_sort: string;
    properties_table_sort_direction: "asc" | "desc";
    properties_table_page_size: number;
    properties_table_current_page: number;
    properties_table_total_pages: number;
}
