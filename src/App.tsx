import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { useState, useEffect } from 'react';
import Loader from './components/Loader/Loader';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <RouterProvider router={router} />;
};

export default App;