import { useState } from 'react';
import StatusBadge from './StatusBadge';

interface Column {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    onRowClick?: (row: any) => void;
    actions?: (row: any) => React.ReactNode;
}

const DataTable = ({ columns, data, onRowClick, actions }: DataTableProps) => {
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleSort = (key: string) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortKey) return 0;

        const aVal = a[sortKey];
        const bVal = b[sortKey];

        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-white/10">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={`text-left px-4 py-3 text-sm font-semibold text-gray-300 ${column.sortable ? 'cursor-pointer hover:text-white' : ''
                                    }`}
                                onClick={() => column.sortable && handleSort(column.key)}
                            >
                                <div className="flex items-center gap-2">
                                    {column.label}
                                    {column.sortable && sortKey === column.key && (
                                        <span className="text-xs">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </th>
                        ))}
                        {actions && <th className="text-left px-4 py-3 text-sm font-semibold text-gray-300">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, index) => (
                        <tr
                            key={index}
                            className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                            onClick={() => onRowClick && onRowClick(row)}
                        >
                            {columns.map((column) => (
                                <td key={column.key} className="px-4 py-3 text-sm text-gray-300">
                                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                                </td>
                            ))}
                            {actions && (
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                        {actions(row)}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {sortedData.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                    <p>No data available</p>
                </div>
            )}
        </div>
    );
};

export default DataTable;
