import { useCallback } from 'react';

const useSound = () => {
  const playSound = useCallback((type) => {
    // Sound deactivated by admin directive
  }, []);

  return { playSound };
};

export default useSound;
