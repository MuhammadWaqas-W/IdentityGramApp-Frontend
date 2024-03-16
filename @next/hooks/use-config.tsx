import { useContext } from 'react';
import { ConfigContext } from '@context';

// ==============================|| CONFIG - HOOKS  ||============================== //

export const useConfig = () => useContext(ConfigContext);
