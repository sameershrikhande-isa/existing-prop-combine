// Default amenities list. Consumers can pass their own list via props.

export type Amenity = { id: string; name: string };

export const DEFAULT_AMENITIES: Amenity[] = [
  { id: "parking", name: "Parking" },
  { id: "swimming-pool", name: "Swimming Pool" },
  { id: "gym", name: "Gym" },
  { id: "clubhouse", name: "Clubhouse" },
  { id: "power-backup", name: "Power Backup" },
  { id: "security", name: "24x7 Security" },
  { id: "lift", name: "Lift" },
  { id: "garden", name: "Garden" },
];


