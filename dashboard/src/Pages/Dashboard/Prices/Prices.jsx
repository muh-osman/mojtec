import style from "./Prices.module.scss";
import React, { useEffect, useState } from "react";
// API
import api from "../../../Utils/Api";

export default function Prices() {
  // State to store the fetched data
  const [serviceMatrix, setServiceMatrix] = useState({
    models: [],
    services: [],
    matrix: [],
  });

  const fetchData = async () => {
    try {
      const res = await api.get(`api/set-price`);
      // Extract models and services
      const models = Object.keys(res.data);
      const services = Object.keys(res.data[models[0]] || {});
      // Create a matrix of prices
      const matrix = models.map((model) => {
        return services.map((service) => res.data[model][service] || "N/A");
      });
      setServiceMatrix({ models, services, matrix });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={style.container}>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            {serviceMatrix.services.map((service, index) => (
              <th key={index} scope="col">
                {service}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {serviceMatrix.matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th scope="row">{serviceMatrix.models[rowIndex]}</th>
              {row.map((price, priceIndex) => (
                <td key={priceIndex}>{price}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
