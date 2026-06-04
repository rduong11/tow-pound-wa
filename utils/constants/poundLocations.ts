export const TOW_POUND_LOCATIONS = [
  "500 E Wacker Dr",
  "10510 Bessie Coleman Dr",
  "10301 S Doty Ave",
  "701 N Sacramento Blvd",
] as const;

export type PoundLocation = (typeof TOW_POUND_LOCATIONS)[number];
