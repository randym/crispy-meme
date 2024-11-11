import { ApexOptions } from "apexcharts";

export const chartSeriesColors: Record<ChartSeriesAttribute, string> = {
  kwh: "#ffbb78",
  daylight: "#98df8a",
  temperature: "#aec7e8",
};

export const chartOptions: ApexOptions = {
  dataLabels: {
    enabled: false,
  },
  yaxis: {
    labels: {
      formatter: (value: number) => {
        return value < 0 ? value.toFixed(1) : value.toString();
      },
    },
  },
  xaxis: {
    type: "datetime",
    labels: {
      datetimeFormatter: {
        year: "yyyy",
        month: "yyyy-MM",
        day: "",
        hour: "",
      },
    },
  },
};
