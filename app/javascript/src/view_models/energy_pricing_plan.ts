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

  get groups(): EnergyPricingGroup[] {
    return this.model.energy_pricing_groups;
  }

  async getCost(): Promise<number> {
    return await this.model.getCost();
  }
}
