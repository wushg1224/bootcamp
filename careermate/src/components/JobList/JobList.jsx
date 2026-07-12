import { data } from "react-router-dom";
import "./JobList.css";
import { useState, useEffect } from "react";

function fetchJobs() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const jobs = ["Frontend Developer", "Backend Developer", "QA Engineer"];
      resolve(jobs);
    }, 1500);
  });
}
export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  //   console.log(resolve);
  useEffect(() => {
    fetchJobs().then((data) => {
      setJobs(data);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <div className="job-loading">Loading jobs...</div>;
  }

  return (
    <div className="job-list">
      <h1>Job List</h1>
      <ul>
        {jobs.map((job) => (
          <li className="job-item">{job}</li>
        ))}
      </ul>
    </div>
  );
}
