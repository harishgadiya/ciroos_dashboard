import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DonutChart } from "../components/DonutChart";
import { DataTable } from "../components/DataTable";
import { useData } from "../hooks/useData";

export const Dashboard = () => {
    const { data, loading } = useData();
    const location = useLocation();
    const navigate = useNavigate();

    // Parse query param on mount
    const queryParams = new URLSearchParams(location.search);
    const initialFilter = queryParams.get("filter") || "";
    const initialSearch = queryParams.get("search") || "";

    const [filter, setFilter] = useState(initialFilter);
    const [search, setSearch] = useState(initialSearch);

    // Update URL whenever filter changes
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (filter) {
            params.set("filter", filter);
        } else {
            params.delete("filter");
        }
        if (search) {
            params.set("search", search)
        } else {
            params.delete("search");
        }
        navigate({ search: params.toString() }, { replace: true });
    }, [filter, search, navigate]);

    if (loading || !data) return <p className="text-center mt-10">Loading...</p>;

    const handleDonutClick = (label: string) => {
        // If we are getting same filter remove it
        setFilter((prev) => (prev === label ? "" : label));
    };

    const filteredRows = data.table.rows.filter((row: any) => {
        const matchFilter = filter
            ? row.Status === filter || row.Category === filter
            : true;
        const matchSearch = search
            ? Object.values(row).some((v) =>
                String(v).toLowerCase().includes(search.toLowerCase())
            )
            : true;
        return matchFilter && matchSearch;
    });

    const handleClearFilters = () => {
        setFilter("");
        setSearch("");
        navigate("/", { replace: true });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">
                {data.dashboardTitle}
            </h1>

            <div className="flex flex-wrap justify-center gap-6">
                <DonutChart
                    title={data.charts.statusDistribution.title}
                    data={data.charts.statusDistribution.data}
                    onSelect={handleDonutClick}
                />
                <DonutChart
                    title={data.charts.categoryDistribution.title}
                    data={data.charts.categoryDistribution.data}
                    onSelect={handleDonutClick}
                />
            </div>

            <div className="mt-6 flex justify-center gap-4 items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    className="border p-2 rounded-lg w-80"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {(filter || search) && (
                    <button
                        onClick={handleClearFilters}
                        className="bg-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition"
                    >
                        Clear Filters
                    </button>
                )}
            </div>

            {/* Active Filter Indicator */}
            {filter && (
                <div className="text-center mt-3 text-gray-600">
                    Active Filter: <span className="font-semibold">{filter}</span>
                </div>
            )}

            <DataTable
                columns={data.table.columns}
                rows={filteredRows}
                searchQuery={search}
            />
        </div>
    );
};
