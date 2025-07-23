export default function DashboardHeader({ role, email }) {
    return (
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">{role} Dashboard</h2>
        <p className="text-sm text-gray-600 mt-1">Welcome, {email}!</p>
        <p className="text-sm text-gray-500 mt-1">Your dashboard information will be displayed here.</p>
      </div>
    );
  }
  