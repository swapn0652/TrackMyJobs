export default function TimelineItem({ title, status }: { title: string; status: string }) {
  return (
    <div className="border-l-2 border-gray-300 pl-4">
      <p className="font-medium text-gray-800">{title}</p>
      <p className="text-sm text-gray-500">Status: {status}</p>
    </div>
  );
}