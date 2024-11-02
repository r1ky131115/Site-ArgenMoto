export interface CreateUserDTO {
    numeroDocumento: string;
    apellido: string;
    nombre: string;
    domicilio: string;
    localidad: string;
    provincia: string;
    telefono: string;
    email: string;
    passwordHash: string;
  }
  
  export interface RegisterFormData {
    dni: string;
    lastName: string;
    firstName: string;
    address: string;
    city: string;
    province: string;
    phone: string;
    email: string;
    password: string;
  }

  export interface User {
    id: string;
    cliente_Id: string;
    rol: string;
  }