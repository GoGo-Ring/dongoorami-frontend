export type IconSize = 'small' | 'medium' | 'large';

export function getSize(size: IconSize | number) {
  if (typeof size === 'number') {
    return size;
  }

  return {
    small: 16,
    medium: 24,
    large: 32,
  }[size];
}
