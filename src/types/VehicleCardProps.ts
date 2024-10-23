import { Vehicle } from "./Vehicle";

export interface VehicleCardProps {
    vehicle: Vehicle;
    onBookNow: (id: number) => void;
    onViewDetails: (id: number) => void;
  }