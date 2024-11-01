const utility = {
    // Función para formatear la fecha
    formatDate: (dateString: string) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date);
    },

    // Función para formatear la hora
    formatTime: (dateString: string) => {
        const [hours, minutes] = dateString.split(':');
        return `${hours}:${minutes}`;
    },
    
  }
  
  export default utility;
  