import * as React from "react";

// Import the PieChart component from the MUI X package
import { PieChart } from "@mui/x-charts/PieChart";

// Define a functional component called Chart
export default function Chart({ free, used }: { free: number; used: number }) {
  // Return a PieChart component with the specified props
  return (
    <PieChart
      // Set the margin for the chart
      margin={{ left: 50, right: 50 }}
      // Set the series data for the chart
      series={[
        {
          data: [
            // Define the data for the used section of the chart
            {
              id: 0,
              value: used,
              label: `${used}% Ocupado`,
              color: used >= 80 ? "red" : used > 50 ? "orange" : "green",
            },
            // Define the data for the free section of the chart
            { id: 1, value: free, label: `${free}% Livre`, color: "blue" },
          ],
          // Set the inner radius of the chart
          innerRadius: 30,
          // Set the outer radius of the chart
          outerRadius: 100,
          // Set the padding angle of the chart
          paddingAngle: used === 100 || free === 100 ? 0 : 2,
          // Set the corner radius of the chart
          cornerRadius: 5,
        },
      ]}
      // Set the slot props for the chart
      slotProps={{
        legend: {
          // Set the direction of the legend
          direction: "row",
          // Set the position of the legend
          position: { vertical: "top", horizontal: "middle" },
          // Set the padding of the legend
          padding: 5,
        },
      }}
      // Set the width of the chart
      width={300}
      // Set the height of the chart
      height={300}
    />
  );
}
