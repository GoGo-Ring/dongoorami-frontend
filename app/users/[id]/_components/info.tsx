interface InfoProps {
  label: string;
  children: React.ReactNode;
}

const Info = ({ label, children }: InfoProps) => {
  return (
    <div className="grid grid-cols-[80px,auto] items-center gap-md">
      <span className="shrink-0">{label}</span>
      {children}
    </div>
  );
};

export default Info;
