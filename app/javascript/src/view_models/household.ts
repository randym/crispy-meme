import { Calculator } from "../lib/utils/calculator";
import { chartSeriesColors } from "../config";

export class Household implements HouseholdViewModel {
  private household: HouseholdModel;

  private energyCalculator: Calculator<EnergyProductionModel>;

  constructor({ household }: { household: HouseholdModel }) {
    this.household = household;
    this.energyCalculator = new Calculator(household.energyProductions);
  }

  private getSeriesFor(attribute: ChartSeriesAttribute) {
    const series = {
      name: attribute,
      color: chartSeriesColors[attribute],
      data: this.household.energyProductions.map(
        (item: EnergyProductionModel) => {
          const x = item.productionMonth;
          const y = item[attribute];
          return { x, y };
        },
      ),
    };

    return [series] as ApexAxisChartSeries;
  }
  private get daylightSeries() {
    return { series: this.getSeriesFor("daylight"), type: "line" as ChartType };
  }

  private get temperatureSeries() {
    return {
      series: this.getSeriesFor("temperature"),
      type: "line" as ChartType,
    };
  }

  private get energySeries() {
    return { series: this.getSeriesFor("kwh"), type: "line" as ChartType };
  }

  private get scaledSeries() {
    const categories = this.energyCalculator.sorted("productionMonth");
    const energies = this.energyCalculator.scaled("kwh");
    const daylights = this.energyCalculator.scaled("daylight");
    const temperatures = this.energyCalculator.scaled("temperature");

    let series = [
      {
        name: "kWh",
        color: chartSeriesColors.kwh,
        data: [] as { x: number; y: number }[],
      },
      {
        name: "daylight",
        color: chartSeriesColors.daylight,
        data: [] as { x: number; y: number }[],
      },
      {
        name: "temperature",
        color: chartSeriesColors.temperature,
        data: [] as { x: number; y: number }[],
      },
    ];

    categories.forEach((item, index) => {
      series[0].data.push({ x: item, y: energies[index] });
      series[1].data.push({ x: item, y: daylights[index] });
      series[2].data.push({ x: item, y: temperatures[index] });
    });

    return { series, type: "line" as ChartType };
  }

  get fullName(): string {
    return `${this.household.firstName} ${this.household.lastName}`;
  }

  get general() {
    return {
      Residents: this.household.residentCount,
      "Has Children": this.household.hasChildren ? "Yes" : "No",
      "Energy Produced": `${this.energyCalculator.sum("kwh")} kWh`,
    };
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
      normalized: "Normalized",
      kwh: "kWh",
      daylight: "Daylight",
      temperature: "Temperature",
    };
  }

  get city() {
    return {
      url: `/cities/${this.household.city.id}`,
      name: this.household.city.name,
    };
  }

  get charts() {
    return {
      normalized: this.scaledSeries,
      kwh: this.energySeries,
      daylight: this.daylightSeries,
      temperature: this.temperatureSeries,
    };
  }

  get url() {
    return `/households/${this.household.id}`;
  }
}
