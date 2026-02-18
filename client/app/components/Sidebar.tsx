export default function Sidebar({ onItemClick }: { onItemClick?: () => void }) {
  const items = ["Dashboard", "Jobs", "Analytics", "Settings"];
  const colors = ["bg-yellow-100", "bg-green-100", "bg-blue-100", "bg-pink-100"];

  return (
    <div className="h-full p-6 space-y-6 bg-white">
      <h2 className="text-3xl mb-8">My Tracker 📒</h2>

      <nav className="space-y-4 text-xl">
        {items.map((item, idx) => (
          <div
            key={item}
            className={`sketch-border p-3 cursor-pointer press-btn ${colors[idx]}`}
            onClick={onItemClick}
          >
            {item}
          </div>
        ))}
      </nav>
    </div>
  );
}
