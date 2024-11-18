import { Calculator } from "../lib/utils/calculator";

export class City implements CityViewModel {
  private city;
  private householdsCalculator: Calculator<HouseholdModel>;
  private energyCalculator: Calculator<EnergyProductionModel>;

  constructor({ city }: { city: CityModel }) {
    this.city = city;
    this.householdsCalculator = new Calculator(city.households!);
    this.energyCalculator = new Calculator(city.energyProductions!);
  }

  private get energySeries() {
    return {
      series: this.getSeriesFor("kwh"),
      type: "boxPlot" as ChartType,
    };
  }

  private get daylightSeries() {
    return {
      series: this.getSeriesFor("daylight"),
      type: "boxPlot" as ChartType,
    };
  }

  private get temperatureSeries() {
    return {
      series: this.getSeriesFor("temperature"),
      type: "boxPlot" as ChartType,
    };
  }

  private getSeriesFor(attribute: ChartSeriesAttribute) {
    const extractor = this.monthlyStats(this.city.energyProductions!);
    const series = {
      name: attribute,
      data: extractor(attribute).map(({ month, min, q1, median, q3, max }) => ({
        x: month,
        y: [min, q1, median, q3, max],
      })),
    };

    return [series] as ApexAxisChartSeries;
  }
  get url(): string {
    return `/cities/${this.city.id}`;
  }

  get name(): string {
    return this.city.name;
  }

  get general() {
    return {
      "Total Residents": this.householdsCalculator.sum("residentCount"),
      "Total Energy Produced": `${this.energyCalculator.sum("kwh")} kWh`,
    };
  }

  get households() {
    return `${this.householdsCalculator.count} (${this.householdsCalculator.sum("hasChildren")})`;
  }

  get householdsUrl() {
    return `/cities/${this.city.id}/households`;
  }

  get averages() {
    return {
      "Energy Produced": `${this.energyCalculator.average("kwh")} kWh`,
      Daylight: `${this.energyCalculator.average("daylight")} lux`,
      Temperature: `${this.energyCalculator.average("temperature")} c`,
    };
  }

  get tabs() {
    return {
      kwh: "kWh",
      daylight: "Daylight",
      temperature: "Temperature",
    };
  }

  get charts() {
    return {
      kwh: this.energySeries,
      daylight: this.daylightSeries,
      temperature: this.temperatureSeries,
    };
  }

  // group rows of energy production by month and calculate stats for each month
  monthlyStats(
    energyProductions: EnergyProductionModel[],
  ): (attribute: keyof EnergyProductionModel) => EnergyProductionStats[] {
    // Transform [{ productionMonth, kwh, ...} ...] into { month: [{kwh, ...}] ...}
    return (attribute): EnergyProductionStats[] => {
      const grouped = energyProductions.reduce(
        (
          acc: Record<string, EnergyProductionModel[]>,
          item: EnergyProductionModel,
        ) => {
          const month: string = item.productionMonth
            .toISOString()
            .split("T")[0];

          acc[month] ||= [];
          acc[month].push(item);
          return acc;
        },
        {},
      );

      // convert { month: [{kwh, ...}] ...} into [{ month, stats } ...]
      // where stats is an aggregate over a single attribute for all months
      return Object.entries(grouped).map(([productionMonth, productions]) => {
        const calculator = new Calculator(productions);
        const month = new Date(productionMonth);
        return {
          month,
          ...calculator.stats(attribute),
        } as EnergyProductionStats;
      });
    };
  }
}
