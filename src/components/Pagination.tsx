import React from 'react';
import '../styles/animation.css'

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    maxVisiblePages?: number;
  }

// Componente de Paginación
const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    maxVisiblePages = 5
  }) => {
    const getVisiblePages = (): (number | string)[] => {
      let pages: (number | string)[] = [];
      let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
  
      // Ajustar el inicio si estamos cerca del final
      start = Math.max(1, end - maxVisiblePages + 1);
  
      // Agregar la primera página y los puntos suspensivos si es necesario
      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }
  
      // Agregar las páginas del medio
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
  
      // Agregar la última página y los puntos suspensivos si es necesario
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
  
      return pages;
    };
  
    return (
      <div className="row mt-5">
        <div className="col text-center">
          <div className="block-27">
            <ul>
              {currentPage > 1 && (
                <li>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    onPageChange(currentPage - 1);
                  }}>&lt;</a>
                </li>
              )}
              
              {getVisiblePages().map((page, index) => (
                <li key={index} className={currentPage === page ? 'active' : ''}>
                  {typeof page === 'number' ? (
                    <a 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange(page);
                      }}
                    >
                      {page}
                    </a>
                  ) : (
                    <span>{page}</span>
                  )}
                </li>
              ))}
  
              {currentPage < totalPages && (
                <li>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    onPageChange(currentPage + 1);
                  }}>&gt;</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  };

export default Pagination;