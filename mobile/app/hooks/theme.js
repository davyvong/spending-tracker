import ThemeContext from 'contexts/theme';
import { useContext } from 'react';

const useTheme = () => useContext(ThemeContext);

export default useTheme;
