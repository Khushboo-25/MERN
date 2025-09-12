import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState({ name: "", email: "", age: "" });

  // Delete function
  async function handleDelete(id) {
    const isConfirmed = window.confirm("Are you sure you want to delete this data?");
    if (!isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:8000/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (response.ok) {
        setError("Deleted Successfully");
        setTimeout(() => {
          setError("");
          getData();
        }, 1000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to delete data");
    }
  }

  // Fetch data + apply frontend filter
  async function getData() {
    try {
      const response = await fetch("http://localhost:8000");
      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
        return;
      }

      // Sort by name
      const sortedData = result.sort((a, b) => a.name.localeCompare(b.name));

      // Apply frontend filter
      const filteredData = sortedData.filter((ele) => {
        return (
          (!search.name || ele.name.toLowerCase().includes(search.name.toLowerCase())) &&
          (!search.email || ele.email.toLowerCase().includes(search.email.toLowerCase())) &&
          (!search.age || ele.age === Number(search.age))
        );
      });

      setData(filteredData);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Failed to fetch data");
    }
  }

  useEffect(() => {
    getData();
  }, [search]); // refetch/filter whenever search changes

  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Search Inputs */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by name"
          value={search.name}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
          className="form-control mb-1"
        />
        <input
          type="text"
          placeholder="Search by email"
          value={search.email}
          onChange={(e) => setSearch({ ...search, email: e.target.value })}
          className="form-control mb-1"
        />
        <input
          type="number"
          placeholder="Search by age"
          value={search.age}
          onChange={(e) => setSearch({ ...search, age: e.target.value })}
          className="form-control mb-1"
        />
      </div>

      {/* Employee Cards */}
      <div className="row">
        {data?.map((ele) => (
          <div key={ele._id} className="col-4">
            <div className="card">
              <h5 className="card-header">{ele.name}</h5>
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Email: {ele.email}</h6>
                <p className="card-text">Age: {ele.age}</p>
                <div className="card-body">
                  <Link to={`/${ele._id}`} className="card-link btn btn-outline-secondary">
                    Edit
                  </Link>
                  <button
                    className="card-link btn btn-outline-danger"
                    onClick={() => handleDelete(ele._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
