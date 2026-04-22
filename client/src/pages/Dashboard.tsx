const Dashboard = () => {
  const stats = [
    { label: 'Applied', value: 10 },
    { label: 'Interview', value: 2 },
    { label: 'Offer', value: 1 },
    { label: 'Rejected', value: 7 },
  ]

  return (
    <div className="p-5">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {
          stats.map(stat => (
            <div className="p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <h2 className="text-2xl font-semibold">{stat.value}</h2>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Dashboard