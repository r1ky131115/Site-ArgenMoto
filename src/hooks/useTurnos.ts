// hooks/useTurnos.ts
import { useState, useEffect } from 'react';
import TurnoService from '../services/TurnoService';
import { Turno, TurnoEstado } from '../types/Turno';

export const useTurnos = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTurnos = async () => {
    try {
      const fetchedTurnos = await TurnoService.getAllTurnos();
      setTurnos(fetchedTurnos);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los turnos');
      setLoading(false);
    }
  };

  const deleteTurnoForAdmin = async (id: number) => {
    try {
      await TurnoService.deleteTurnoForAdmin(id);
      setTurnos(turnos.filter(turno => turno.id !== id));
    } catch (err) {
      setError('Error al eliminar el turno');
    }
  };

  // const updateTurno = async (id: number, updateTurno: UpdateTurnoDTO) => {
  //   try {
  //     await TurnoService.updateTurnoData(id, updateTurno);
  //   } catch (err) {
  //     setError('Error al actualizar el estado del turno');
  //   }
  // };

  const updateTurnoEstado = async (id: number, nuevoEstado: TurnoEstado) => {
    try {
      const updatedTurno = await TurnoService.updateTurnoEstado(id);
      setTurnos(updatedTurno);
    } catch (err) {
      setError('Error al actualizar el estado del turno');
    }
  };

  useEffect(() => {
    fetchTurnos();
  }, []);

  return {
    turnos,
    loading,
    error,
    deleteTurnoForAdmin,
    updateTurnoEstado,
    refetchTurnos: fetchTurnos
  };
};