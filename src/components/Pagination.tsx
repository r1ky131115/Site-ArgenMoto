import React from 'react';
import {
  Box,
  Pagination as MuiPagination,
  PaginationItem,
  useTheme,
  useMediaQuery,
  Tooltip,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import {
  FirstPage,
  LastPage,
  NavigateNext,
  NavigateBefore,
} from '@mui/icons-material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  itemsPerPage?: number;
  totalItems?: number;
  showItemsPerPage?: boolean;
  showNavigationTooltips?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  itemsPerPage,
  totalItems,
  showItemsPerPage = true,
  showNavigationTooltips = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Calcula el rango de items mostrados
  const calculateItemRange = () => {
    if (!itemsPerPage || !totalItems) return null;
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);
    return { start, end };
  };

  const itemRange = calculateItemRange();

  // Determina el número de páginas a mostrar basado en el tamaño de pantalla
  const siblingCount = isMobile ? 0 : Math.min(2, Math.floor(maxVisiblePages / 2));

  return (
    <Box
      sx={{
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        {/* Botón Primera Página */}
        <Tooltip 
          title={showNavigationTooltips ? "Primera página" : ""}
          arrow
        >
          <span>
            <IconButton
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              size="small"
            >
              <FirstPage />
            </IconButton>
          </span>
        </Tooltip>

        {/* Componente principal de paginación */}
        <MuiPagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => onPageChange(page)}
          siblingCount={siblingCount}
          size={isMobile ? 'small' : 'medium'}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: NavigateBefore, next: NavigateNext }}
              {...item}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                },
              }}
            />
          )}
        />

        {/* Botón Última Página */}
        <Tooltip 
          title={showNavigationTooltips ? "Última página" : ""}
          arrow
        >
          <span>
            <IconButton
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              size="small"
            >
              <LastPage />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>

      {/* Información de items por página */}
      {showItemsPerPage && itemRange && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center' }}
        >
          Mostrando {itemRange.start}-{itemRange.end} de {totalItems} items
        </Typography>
      )}
    </Box>
  );
};

export default Pagination;