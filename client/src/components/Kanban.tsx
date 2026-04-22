import Card, { type CardProps } from "./Card";

const statuses = ["Applied", "Interview", "Offer", "Rejected"];

const Kanban = () => {
  const data : CardProps[] = [
    {
      company: 'Google',
      role: 'Software Engineer',
      status: 'Applied',
      dateApplied: '15/04/2026'
    },
    {
      company: 'Nexora Technologies',
      role: 'Full Stack Developer',
      status: 'Interview',
      dateApplied: '07/04/2026'
    },
    {
      company: 'BluePixel Labs',
      role: 'Front-End Developer',
      status: 'Offer',
      dateApplied: '03/03/2026'
    },
    {
      company: 'BluePixel Labs',
      role: 'Front-End Developer',
      status: 'Offer',
      dateApplied: '03/03/2026'
    },
  ]

  return (
    <div className="flex gap-6 mt-4 ">
      {
        statuses.map(status => (
          <div key={status} className="w-80  bg-gray-100 rounded-2xl p-4 flex flex-col gap-3">
            <h2 className="font-semibold text-lg text-gray-700 px-3">
              {status}
            </h2>

            {
              data
              .filter(item => item.status === status)
              .map(item => (
                <Card {...item} />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default Kanban