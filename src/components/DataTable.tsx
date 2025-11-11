interface DataTableProps {
    columns: string[];
    rows: any[];
    searchQuery: string;
}

export const DataTable = ({ columns, rows, searchQuery }: DataTableProps) => {
    const filteredRows = rows.filter((r) =>
        Object.values(r).some((v) =>
            String(v).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div className="bg-white p-4 rounded-2xl shadow-md mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col} className="p-2 border-b font-semibold">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredRows.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                            {columns.map((col) => (
                                <td key={col} className="p-2 border-b">
                                    {row[col]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
