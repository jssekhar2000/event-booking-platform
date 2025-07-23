export default function DashboardCard({ title, subtitle, bg }) {
    return (
      <div className={`rounded-xl p-6 shadow text-center ${bg}`}>
        <h3 className="font-semibold text-sm text-gray-700">{title}</h3>
        <p className="text-lg text-purple-700 font-bold mt-1">{subtitle}</p>
      </div>
    );
  }
  