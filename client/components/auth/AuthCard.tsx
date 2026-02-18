export default function AuthCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="
        sketch-card 
        w-full 
        max-w-sm sm:max-w-md md:max-w-lg
        p-6 sm:p-8 md:p-10
      ">
        {children}
      </div>
    </div>
  );
}
