import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(0);

  const fetchData = async function () {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const jobToggle = function (index) {
    setValue(index);
  };

  if (isLoading) {
    return (
      <section className="section loading">
        <h1>Loading ...</h1>
      </section>
    );
  }
  const { company, dates, duties, title } = data[value];
  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center"></div>
      {/* btn container */}
      <div className="btn-container">
        {data.map((item, index) => (
          <button
            key={item.id}
            onClick={() => jobToggle(index)}
            className={`job-btn ${index === value && "active-btn"}`}
          >
            {item.company}
          </button>
        ))}
      </div>
      {/* job info */}
      <article className="job-info">
        <h3>{title}</h3>
        <h4>{company}</h4>
        <p className="job-date">{dates}</p>
        {duties.map((duty, index) => (
          <div className="job-desc" key={index}>
            <FaAngleDoubleRight className="job-icon" />
            <p>{duty}</p>
          </div>
        ))}
      </article>
    </section>
  );
}
export default App;
