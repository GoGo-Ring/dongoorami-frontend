interface CalculateStarRatingType {
  starCount: number;
  rate: number;
}

const StarState = {
  None: 'none',
  Half: 'half',
  Full: 'full',
};

type FilledType = 'none' | 'half' | 'full';

export const calculateStarRating = ({
  starCount,
  rate,
}: CalculateStarRatingType) => {
  const defaultRating = Array.from(
    { length: starCount },
    () => StarState.None as FilledType,
  );
  const hasHalf = Number.isInteger(rate);

  if (rate === 0) {
    return defaultRating;
  }

  const IntegerRate = Math.floor(rate);
  const newRating = defaultRating.map((none, index) =>
    index <= IntegerRate - 1 ? (StarState.Full as FilledType) : none,
  );

  if (!hasHalf) {
    newRating[IntegerRate] = StarState.Half as FilledType;
  }

  return newRating;
};
