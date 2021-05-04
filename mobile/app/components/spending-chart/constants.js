import { Animated } from 'react-native';

export const daysOfWeek = [
  'common.days-of-week.sunday',
  'common.days-of-week.monday',
  'common.days-of-week.tuesday',
  'common.days-of-week.wednesday',
  'common.days-of-week.thursday',
  'common.days-of-week.friday',
  'common.days-of-week.saturday',
];

export const initialAnimatedData = daysOfWeek.map(() => new Animated.Value(0));
