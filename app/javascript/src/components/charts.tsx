import React, { useState } from "react";
import {
  Tab,
  Tabs,
  TabsHeader,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import ApexChart from "react-apexcharts";
import { Config } from "../config";
const { chartOptions } = Config.apex;

const Chart: React.FC<ChartProps> = (props) => {
  return (
    <div className="grow">
      <ApexChart options={chartOptions} {...props} />
    </div>
  );
};

export const Charts: React.FC<ChartsProps> = ({ viewModel }) => {
  const { tabs, charts } = viewModel;

  const [chart, setChart] = useState(Object.keys(charts)[0]);
  return (
    <Tabs value={chart}>
      <TabsHeader>
        {Object.entries(tabs).map(([key, value]) => (
          <Tab key={key} value={key} onClick={() => setChart(key)}>
            {value}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {Object.entries(charts).map(([key, value]) => (
          <TabPanel key={key} value={key}>
            {chart == key && <Chart {...value} />}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};
