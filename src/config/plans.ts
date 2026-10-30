// Commercial proposal. Only the 49 € entry point is fixed by the brief;
// every other value is a hypothesis pending validation (see docs/PRECIOS-SUPUESTOS.md).
export const plans = [
  { id: "esencial", price: 49, featured: false },
  { id: "negocio", price: 99, featured: true },
  { id: "crecimiento", price: 199, featured: false },
  { id: "empresa", price: null, featured: false },
] as const;

export type PlanId = (typeof plans)[number]["id"];
