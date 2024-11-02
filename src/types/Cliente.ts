export interface Cliente {
    id: number;
    tipoDocumento: string;
    numeroDocumento: string;
    apellido: string;
    nombre: string;
  }

export interface ClienteData {
  id: number;
  idUsuario: number;
  tipoDocumento: string;
  numeroDocumento: string;
  apellido: string;
  nombre: string;
  domicilio: string;
  localidad: string;
  provincia: string;
  telefono: string;
  email: string;
}