export interface Proveedor {
  id: number;
  cuit: string;
  razonSocial?: string;
  apellido: string;
  nombre: string;
  domicilio?: string;
  localidad?: string;
  provincia?: string;
  telefono?: string;
  email: string;
  categoria?: string;
}