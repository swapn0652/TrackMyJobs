export default function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-gray-500 mt-1">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-gray-800 font-medium break-words">{value}</p>
      </div>
    </div>
  );
}