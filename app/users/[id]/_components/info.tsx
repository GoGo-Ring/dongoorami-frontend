interface InfoProps {
  label: string;
  children: React.ReactNode;
}

const Info = ({ label, children }: InfoProps) => {
  return (
    <div className="flex items-center gap-md">
      <span className="shrink-0">{label}</span>
      {children}
    </div>
  );
};

export default Info;
