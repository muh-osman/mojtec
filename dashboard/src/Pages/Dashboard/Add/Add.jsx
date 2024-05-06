import style from "./Add.module.scss";
import { useEffect, useState } from "react";
// API
import api from "../../../Utils/Api";
// Toastify
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Add() {
  const [loading, setLoading] = useState(false);

  const [repairService, setRepairService] = useState([]);
  // const [iphoneModels, setIphoneModels] = useState([]);

  const [selectedData, setSelectedData] = useState({
    model: "",
    service: "",
    price: "",
  });

  const getData = async () => {
    try {
      const res = await api.get(`api/data`);
      // console.log(res);

      setRepairService(res.data.repair_service_names);
    } catch (err) {
      console.error(err);
    }
  };

  const services = repairService.map((service, i) => (
    <div key={i} className="mb-3" dir="rtl">
      <label className="form-check-label" htmlFor={`serv${i}`}>
        {service}
      </label>

      <input
        id={`serv${i}`}
        className="form-control"
        type="number"
        name={service}
        // value={service}
        required
        placeholder="0.00"
      />
    </div>
  ));

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Get the entered model
    const selectedModel = e.target.elements["iphone-model"].value;

    // Initialize an object to collect service prices
    let servicePrices = {};

    // Iterate over the repairService array to get the input values
    repairService.forEach((service) => {
      const inputValue = e.target.elements[service].value;
      servicePrices[service] = inputValue;
    });

    // Create a data object to be sent
    const dataToSend = {
      model: selectedModel,
      services: servicePrices,
    };

    // console.log(dataToSend);

    try {
      // Send the data to the API
      const res = await api.post(`api/iphone-with-services-prices`, dataToSend);

      // Reset the form fields
      e.target.reset();
      // Update the state with the new data
      setSelectedData(dataToSend);
      // Optionally, reset the state if needed
      setSelectedData({ service: "", model: "", price: "" });

      setLoading(false);

      toast.success("The device has been added.");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      {/* Start Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {/* End Toastify */}
      <div className={style.box}>
        <form onSubmit={handleSubmit}>
          <h1>اضافة جهاز</h1>
          <div className={style.b}>
            {/* <!-- الموديلات --> */}
            <div className="col-12 mb-4">
              <h5 dir="rtl">الموديل:</h5>
              <input
                className="form-control"
                placeholder="أدخل اسم الجهاز"
                type="text"
                name="iphone-model"
                dir="rtl"
                required
              />
            </div>

            {/* اسعار الخدمات */}
            <div className="cust col-12 mb-4 vv">
              <div className="form-group cust-2">
                <h5 dir="rtl">اسعار الخدمات:</h5>
              </div>
              {services}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary"
            >
              اضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
