const Divider = () => {
  return (
    <div className="flex items-center w-full gap-4">
      <hr className="flex-1 border-t border-border" />
      <span className="text-muted-foreground">or</span>
      <hr className="flex-1 border-t border-border" />
    </div>
  );
};

export default Divider;
