import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  async function handleDelete(id) {
    const response = await fetch(`http://localhost:8000/${id}`, {
      method: "DELETE",
    });

    const result1 = await response.json();
    
    if (!response.ok) {
      setError(result1.error);
    }
    if (response.ok) {
      console.log("deleted", response.ok);
      setError("Deleted Successfully");
      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    }
    
  }

  async function getData() {
    const response = await fetch("http://localhost:8000");
    const result = await response.json();
    const sortedData = result.sort((a, b) => a.name.localeCompare(b.name));
      
    setData(sortedData);
    console.log("result..", result);
    if (!response.ok) {
      setError(result.error);
    }

    if (response.ok) {
      setData(result);
      setError("");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-2">
      {error && <div class="alert alert-danger"> {error} </div>}
      <div className="row">
        {data?.map((ele) => (
          <div key={ele._id} className="col-3">
            <div class="card">
            <h5 class="card-header">{ele.name}</h5>
              <div class="card-body">
                
                <h6 class="card-subtitle mb-2 text-muted">{ele.email}</h6>
                <p class="card-text">{ele.age}</p>
                <div className="card-body">
                  
                    <Link to={`/${ele._id}`} className="card-link btn btn-outline-secondary">
                    Edit
                    </Link>
                    
                    
                    <Link class="card-link btn btn-outline-danger" onClick={() => handleDelete(ele._id)}>
                    Delete
                  </Link>
                    

                </div>
                
                
                 
              </div>
            </div>
            <br/>
          </div>
          
        )
        )}
      </div>
    </div>
  );
};

export default Read;
