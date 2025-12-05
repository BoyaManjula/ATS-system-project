export default function JobCard({ job }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition mb-4">
      <h2 className="font-bold text-xl">{job.title}</h2>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <a
        href={`/apply/${job._id}`}
        className="text-blue-500 mt-2 inline-block"
      >
        Apply
      </a>
    </div>
  );
}
