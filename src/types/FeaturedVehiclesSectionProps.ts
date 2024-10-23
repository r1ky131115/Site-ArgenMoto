import { Vehicle } from "./Vehicle";

export interface FeaturedVehiclesSectionProps {
    vehicles: Vehicle[];
    onBookNow: (id: number) => void;
    onViewDetails: (id: number) => void;
  }