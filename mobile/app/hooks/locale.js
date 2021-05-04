import LocaleContext from 'contexts/locale';
import { useContext } from 'react';

const useLocale = () => useContext(LocaleContext);

export default useLocale;
