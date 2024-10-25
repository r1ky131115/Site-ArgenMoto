import React, { useState } from 'react';
import VehicleCard from '../Card/VehicleCard';
import { Vehicle } from '../../types/Vehicle';
import Pagination from '../Pagination';
import useAnimateOnScroll from '../../hooks/useAnimateOnScroll';
import '../../styles/animation.css'

interface VehicleGridProps {
  vehicles: Vehicle[];
  itemsPerPage?: number;
  itemsPerRow?: number;
  onBookNow: (id: number) => void;
  onViewDetails: (id: number) => void;
  className?: string;
}

// Componente principal de la grilla
const VehicleGrid: React.FC<VehicleGridProps> = ({
  vehicles,
  itemsPerPage = 9,
  itemsPerRow = 3,
  onBookNow,
  onViewDetails,
  className = ''
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const servicesRef = useAnimateOnScroll<HTMLDivElement>();

  // Calcular el total de páginas
  const totalPages = Math.ceil(vehicles.length / itemsPerPage);

  // Obtener los vehículos de la página actual
  const getCurrentPageVehicles = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return vehicles.slice(startIndex, endIndex);
  };

  // Calcular el ancho de la columna basado en itemsPerRow
  const columnClass = `col-md-${12 / itemsPerRow}`;

  return (
    <section className={`ftco-section bg-light ${className}`}>
      <div className="container">
        <div ref={servicesRef} className="row ftco-animate">
          {getCurrentPageVehicles().map((vehicle) => (
            <div key={vehicle.id} className={columnClass}>
              <div ref={servicesRef} className="car-wrap rounded ">
                <VehicleCard
                  vehicle={vehicle}
                  onBookNow={onBookNow}
                  onViewDetails={onViewDetails}
                />
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
};

export default VehicleGrid;