import React, { useEffect, useState } from 'react';
import ArticleCard from '../Card/ArticleCard';
import { ArticleProps } from '../../types/ArticleProps';
import Pagination from '../Pagination';
import useAnimateOnScroll from '../../hooks/useAnimateOnScroll';
import { getArticles } from '../../services/ArticleAPI';
import '../../styles/animation.css';

interface VehicleGridProps {
  itemsPerPage?: number;
  itemsPerRow?: number;
  onBookNow: (id: number) => void;
  onViewDetails: (id: number) => void;
  className?: string;
}

// Componente principal de la grilla
const VehicleGrid: React.FC<VehicleGridProps> = ({
  itemsPerPage = 9,
  itemsPerRow = 3,
  onBookNow,
  onViewDetails,
  className = ''
}) => {
  const [vehicles, setVehicles] = useState<ArticleProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesRef = useAnimateOnScroll<HTMLDivElement>();

  // Obtener los artículos al montar el componente
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await getArticles();
        setVehicles(articles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, []); // Solo se ejecuta una vez al montar

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
              <div className="car-wrap rounded">
                <ArticleCard
                  vehicle={vehicle}
                  onBookNow={() => onBookNow(vehicle.id)} // Llama a onBookNow con el ID del vehículo
                  onViewDetails={() => onViewDetails(vehicle.id)} // Llama a onViewDetails con el ID del vehículo
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
