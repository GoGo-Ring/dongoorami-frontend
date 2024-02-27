export const Error = ({ error }: { error: string }) => {
  if (!error) {
    return <p className="p-1 text-xs text-destructive">&nbsp;</p>;
  }

  return <p className="p-1 text-xs text-destructive">{error}</p>;
};
