import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface DonutChartProps {
    data: { label: string; value: number }[];
    title: string;
    onSelect?: (label: string) => void;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF4444"];

export const DonutChart = ({ data, title, onSelect }: DonutChartProps) => {
    console.log(data, '>>>>>')
    return (
        <div className="bg-white p-4 rounded-2xl shadow-md">
            <h2 className="font-semibold text-lg mb-2 text-center">{title}</h2>
            <PieChart width={250} height={250}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    fill="#8884d8"
                    onClick={(d) => onSelect && onSelect(d.label)}
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    );
};
