import { fontFamilies } from 'constants/fonts';
import normalizeText from 'utils/normalize-text';

export const getCalendarTheme = palette => ({
  arrowColor: palette.get('normalText'),
  dayTextColor: palette.get('normalText'),
  backgroundColor: palette.get('modalBackground'),
  calendarBackground: palette.get('modalBackground'),
  monthTextColor: palette.get('normalText'),
  selectedDayBackgroundColor: palette.get('primaryText'),
  selectedDayTextColor: palette.get('modalBackground'),
  textSectionTitleColor: palette.get('normalText'),
  todayTextColor: palette.get('primaryText'),
  textDayFontFamily: fontFamilies.productSansRegular,
  textDayFontSize: normalizeText(12),
  textDayHeaderFontFamily: fontFamilies.productSansRegular,
  textDayHeaderFontSize: normalizeText(12),
  textDisabledColor: palette.get('mutedText'),
  textMonthFontFamily: fontFamilies.productSansRegular,
  textMonthFontSize: normalizeText(16),
});
