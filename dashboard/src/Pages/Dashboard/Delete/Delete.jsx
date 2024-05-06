import style from "./Delete.module.scss";
import { useEffect, useState } from "react";
// API
import api from "../../../Utils/Api";
// Toastify
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Delete() {
  const [loading, setLoading] = useState(false);

  const [iphoneModels, setIphoneModels] = useState([]);

  const [selectedData, setSelectedData] = useState({
    model: "",
  });

  const getData = async () => {
    try {
      const res = await api.get(`api/data`);
      //   console.log(res);

      setIphoneModels(res.data.iphone_models);
    } catch (err) {
      console.error(err);
    }
  };

  const models = iphoneModels.map((maodel, i) => (
    <option key={i} dir="ltr" value={maodel}>
      {maodel}
    </option>
  ));

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Get the selected model
    const selectedModel = e.target.elements["الموديل"].value;

    const dataToSend = {
      model: selectedModel,
    };

    // console.log(selectedModel);

    try {
      // Send the data to the API
      const res = await api.post(`api/iphones`, {
        model: selectedModel,
      });

      //   console.log(res);

      // Reset the form fields
      e.target.reset();
      // Update the state with the new data
      setSelectedData(dataToSend);
      // Optionally, reset the state if needed
      setSelectedData({ model: "" });

      setLoading(false);

      toast.success("The device has been deleted.");

      getData();
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
          <h1>حذف جهاز</h1>
          <div className={style.b}>
            {/* <!-- الموديلات --> */}
            <div className="col-12  mb-4">
              <div className="form-group">
                <h5 dir="rtl">الموديل:</h5>
                <select
                  className="form-control"
                  name="الموديل"
                  required
                  defaultValue=""
                >
                  <option dir="rtl" value="" disabled>
                    اختر أحد الخيارات
                  </option>

                  {models}
                </select>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary"
            >
              حذف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
