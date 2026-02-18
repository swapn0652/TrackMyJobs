export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl">Welcome back 👋</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="sketch-card p-6">
          <h3 className="text-2xl mb-2">Applications</h3>
          <p className="text-5xl">0</p>
        </div>

        <div className="sketch-card p-6 bg-yellow-100">
          <h3 className="text-2xl mb-2">Interviews</h3>
          <p className="text-5xl">0</p>
        </div>

        <div className="sketch-card p-6 bg-green-100">
          <h3 className="text-2xl mb-2">Offers</h3>
          <p className="text-5xl">0</p>
        </div>
      </div>

      <div className="sketch-card h-[400px] flex items-center justify-center text-2xl">
        Charts coming soon 📈
      </div>
    </div>
  );
}
