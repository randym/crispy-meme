export class EnergyPricingPlan {
  private model: EnergyPricingPlanModel;
  constructor({ model }: { model: EnergyPricingPlanModel }) {
    this.model = model;
  }

  get name(): string {
    return this.model.name;
  }

  get id(): number {
    return this.model.id;
  }

  get groups(): IEnergyPricingGroup[] {
    return this.model.groups;
  }

  async getCost(readings: number[][]): Promise<number> {
    return await this.model.getCost();
  }
}
