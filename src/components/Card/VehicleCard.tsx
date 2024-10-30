import { ArticleCardProps } from "../../types/ArticleCardProps";

  // Componente de tarjeta individual
const VehicleCard: React.FC<ArticleCardProps> = ({ vehicle, onBookNow, onViewDetails }) => {
  return (
    <div className="car-wrap rounded">
        <div 
          className="img rounded d-flex align-items-end"
          style={{ backgroundImage: `url(${vehicle.imageUrl})` }}
        />
        <div className="text">
          <h2 className="mb-0">
            <a href="/" className="text-gray-800 hover:text-blue-600">
              {vehicle.name}
            </a>
          </h2>
          <div className="d-flex mb-3">
            <span className="cat">{vehicle.brand}</span>
            <p className="price ml-auto">
              ${vehicle.price}
              </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onBookNow(vehicle.id)}
              className="btn btn-primary py-2 mr-1"
            >
              Book now
            </button>
            <button
              onClick={() => onViewDetails(vehicle.id)}
              className="btn btn-secondary py-2 ml-1"
            >
              Details
            </button>
          </div>
        </div>
    </div>
  );
};
export default VehicleCard;