/*
    This file contains a custom hook that fetches data from the API based on the current CRM tab.
    It uses the useEffect hook to fetch data when the current CRM tab changes or when any of the
    sort, filter, or pagination options change.
*/
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { getTableData } from '@/api/tableData';
import {
    setPropertiesCurrentPage, setPeopleCurrentPage, setTransactionsCurrentPage,
    setPeopleTotalItems, setPeopleTotalPages, setPropertiesTotalItems, setPropertiesTotalPages, setTransactionsTotalItems, setTransactionsTotalPages
} from '@/app/store/dataSlice';

interface UseDataFetchingProps {
    setData: React.Dispatch<React.SetStateAction<any>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useFetchDataEffect = ({
    setData,
    setIsLoading
}: UseDataFetchingProps) => {
    const dispatch = useDispatch();
    const {
        current_data_table,
        user_id,
        properties_page_size,
        properties_current_page,
        properties_sort_by,
        properties_sort_direction,
        include_properties_statuses,
        include_properties_types,
        people_page_size,
        people_current_page,
        people_sort_by,
        people_sort_direction,
        include_people_statuses,
        include_people_types,
        transactions_page_size,
        transactions_current_page,
        transactions_sort_by,
        transactions_sort_direction,
        include_transactions_statuses,
        include_transactions_types,
        refresh_table_data_flag,
    } = useSelector((state: RootState) => ({
        user_id: state.user.id,
        ...state.data
    }));

    useEffect(() => {
        if (current_data_table === 'properties') {
            setIsLoading(true);
            getTableData(user_id, "properties", properties_page_size, properties_current_page, properties_sort_by, properties_sort_direction, include_properties_statuses, include_properties_types)
                .then(fetchedData => {
                    setData(fetchedData.data);
                    dispatch(setPropertiesTotalItems(fetchedData.total_items));
                    dispatch(setPropertiesTotalPages(fetchedData.total_pages));
                    setIsLoading(false);
                    if (fetchedData.total_pages < properties_current_page) {
                        dispatch(setPropertiesCurrentPage(1));
                    }
                })
                .catch(error => {
                    console.error('Error fetching properties data:', error);
                    setIsLoading(false);
                });
        } else if (current_data_table === 'people') {
            setIsLoading(true); // Set loading to true before fetching data
            getTableData(user_id, "people", people_page_size, people_current_page, people_sort_by, people_sort_direction, include_people_statuses, include_people_types)
                .then(fetchedData => {
                    setData(fetchedData.data);
                    dispatch(setPeopleTotalItems(fetchedData.total_items));
                    dispatch(setPeopleTotalPages(fetchedData.total_pages));
                    setIsLoading(false);
                    if (fetchedData.total_pages < people_current_page) {
                        dispatch(setPeopleCurrentPage(1));
                    }
                })
                .catch(error => {
                    console.error('Error fetching people data:', error);
                    setIsLoading(false);
                });
        }
        else if (current_data_table === 'transactions') {
            setIsLoading(true); // Set loading to true before fetching data
            getTableData(user_id, "transactions", transactions_page_size, transactions_current_page, transactions_sort_by, transactions_sort_direction, include_transactions_statuses, include_transactions_types)
                .then(fetchedData => {
                    setData(fetchedData.data);
                    console.log(fetchedData.data)
                    dispatch(setTransactionsTotalItems(fetchedData.total_items));
                    dispatch(setTransactionsTotalPages(fetchedData.total_pages));
                    setIsLoading(false);
                    if (fetchedData.total_pages < transactions_current_page) {
                        dispatch(setTransactionsCurrentPage(1));
                    }
                })
                .catch(error => {
                    console.error('Error fetching transactions data:', error);
                    setIsLoading(false);
                });
        } else {
            console.error('Missing required state values for fetching properties data');
        }
        // Repeat for 'people' and 'transactions' with respective adjustments
    }, [dispatch, user_id, current_data_table, properties_page_size,
        properties_current_page, properties_sort_by, properties_sort_direction,
        include_properties_statuses, include_properties_types, people_current_page,
        transactions_current_page, people_sort_by, people_sort_direction,
        include_people_statuses, include_people_types, include_transactions_statuses,
        include_transactions_types, transactions_sort_by, transactions_sort_direction,
        people_page_size, transactions_page_size, refresh_table_data_flag, setData,
        setIsLoading]);
};

export default useFetchDataEffect;
