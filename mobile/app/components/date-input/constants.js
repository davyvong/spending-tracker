import { fontFamilies } from 'constants/fonts';
import { normalizeText } from 'utils/styles';

export const getCalendarTheme = palette => ({
  arrowColor: palette.get('texts.normal'),
  dayTextColor: palette.get('texts.normal'),
  backgroundColor: palette.get('backgrounds.modal'),
  calendarBackground: palette.get('backgrounds.modal'),
  monthTextColor: palette.get('texts.normal'),
  selectedDayBackgroundColor: palette.get('texts.primary'),
  selectedDayTextColor: palette.get('backgrounds.modal'),
  textSectionTitleColor: palette.get('texts.normal'),
  todayTextColor: palette.get('texts.primary'),
  textDayFontFamily: fontFamilies.productSansRegular,
  textDayFontSize: normalizeText(12),
  textDayHeaderFontFamily: fontFamilies.productSansRegular,
  textDayHeaderFontSize: normalizeText(12),
  textDisabledColor: palette.get('texts.muted'),
  textMonthFontFamily: fontFamilies.productSansRegular,
  textMonthFontSize: normalizeText(16),
});
