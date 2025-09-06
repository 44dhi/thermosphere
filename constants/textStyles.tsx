import { TextStyle } from 'react-native';

export type TextVariants =
  | 'heading.xxx-large'
  | 'heading.xx-large'
  | 'heading.x-large'
  | 'heading.large'
  | 'heading.medium'
  | 'heading.small'
  | 'heading.x-small'
  | 'heading.xx-small'
  | 'paragraph.large.regular'
  | 'paragraph.large.bold'
  | 'paragraph.medium.regular'
  | 'paragraph.medium.bold'
  | 'paragraph.small.regular'
  | 'paragraph.small.bold'
  | 'paragraph.x-small.regular'
  | 'paragraph.x-small.bold';

export const textStyles: Record<TextVariants, TextStyle> = {
  'heading.xxx-large': {
    fontSize: 36,
    fontFamily: 'PlusJakartaSansBold',
  },
  'heading.xx-large': {
    fontSize: 32,
    fontFamily: 'PlusJakartaSansBold',
  },
  'heading.x-large': {
    fontSize: 28,
    fontFamily: 'PlusJakartaSansBold',
  },
  'heading.large': {
    fontSize: 24,
    fontFamily: 'PlusJakartaSansBold',
  },

  'heading.medium': {
    fontSize: 20,
    fontFamily: 'PlusJakartaSansBold',
  },
  'heading.small': {
    fontSize: 18,
    fontFamily: 'PlusJakartaSansBold',
  },

  'heading.x-small': {
    fontSize: 14,
    fontFamily: 'PlusJakartaSansBold',
  },
  'heading.xx-small': {
    fontSize: 14,
    fontFamily: 'PlusJakartaSansBold',
  },
  'paragraph.large.regular': {
    fontSize: 16,
    fontFamily: 'Geist',
    letterSpacing: 0.4,
  },
  'paragraph.large.bold': {
    fontSize: 16,
    fontFamily: 'GeistBold',
    letterSpacing: 0.4,
  },
  'paragraph.medium.regular': {
    fontSize: 14,
    fontFamily: 'Geist',
    letterSpacing: 0.32,
  },
  'paragraph.medium.bold': {
    fontSize: 14,
    fontFamily: 'GeistBold',
    letterSpacing: 0.32,
  },

  'paragraph.small.regular': {
    fontSize: 12,
    fontFamily: 'Geist',
    letterSpacing: 0.32,
  },
  'paragraph.small.bold': {
    fontSize: 12,
    fontFamily: 'GeistBold',
    letterSpacing: 0.32,
  },

  'paragraph.x-small.regular': {
    fontSize: 10,
    fontFamily: 'Geist',
    letterSpacing: 0.32,
  },
  'paragraph.x-small.bold': {
    fontSize: 10,
    fontFamily: 'GeistBold',
    letterSpacing: 0.32,
  },
};
