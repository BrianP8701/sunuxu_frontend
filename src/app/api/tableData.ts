import { withApiErrorHandling, generateBackendUrl } from '@/app/api/apiUtils';

export const getTableData = withApiErrorHandling(async (table: string, page_size: number, page_number: number, sorting: string, filters: string[]) => {
    const response = await fetch(generateBackendUrl(`/${table}?page_size=${page_size}&page_number=${page_number}&sorting=${sorting}&filters=${filters.join(',')}`));
    return response.json();
});
