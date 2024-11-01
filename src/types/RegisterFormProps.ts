export interface RegisterFormProps {
    onRegister: (userData: {
      dni: string;
      lastName: string;
      firstName: string;
      address?: string;
      city?: string;
      province?: string;
      phone?: string;
      email: string;
      password: string;
    }) => void;
  }