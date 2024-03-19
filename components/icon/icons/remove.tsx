const RemoveIcon = (props: React.ComponentProps<'svg'>) => {
  // Assuming props might include width and height for the SVG
  const svgWidth = Number(props.width) || 15;
  const svgHeight = Number(props.height) || 15;

  const padding = 2; // Padding from the edges
  const lineWidth = 2; // This represents the 'visual' thickness of the lines, adjust as needed

  // Center point
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;

  // Calculate start and end points for lines based on the center
  const lineLength = Math.min(svgWidth, svgHeight) / 2 - padding; // Ensuring the line fits within the smallest dimension

  // Starting and ending points for the diagonal lines, ensuring they're centered
  const startX1 = centerX - lineLength;
  const startY1 = centerY - lineLength;
  const endX1 = centerX + lineLength;
  const endY1 = centerY + lineLength;
  const startX2 = centerX + lineLength;
  const startY2 = centerY - lineLength;
  const endX2 = centerX - lineLength;
  const endY2 = centerY + lineLength;

  // Path for a cross (X) that adjusts with size changes
  const dPath = `M${startX1},${startY1} L${endX1},${endY1} M${startX2},${startY2} L${endX2},${endY2}`;

  return (
    <svg
      width={svgWidth.toString()}
      height={svgHeight.toString()}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d={dPath}
        stroke="currentColor" // Makes the icon color inherit from parent
        strokeWidth={lineWidth}
      />
    </svg>
  );
};

export default RemoveIcon;
