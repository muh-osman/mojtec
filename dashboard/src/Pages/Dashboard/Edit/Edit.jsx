import style from "./Edit.module.scss";
import { useEffect, useState } from "react";
// API
import api from "../../../Utils/Api";
// Toastify
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Edit() {
  const [loading, setLoading] = useState(false);

  const [repairService, setRepairService] = useState([]);
  const [iphoneModels, setIphoneModels] = useState([]);

  const [selectedData, setSelectedData] = useState({
    service: "",
    model: "",
    price: "",
  });

  const getData = async () => {
    try {
      const res = await api.get(`api/data`);
      // console.log(res);

      setRepairService(res.data.repair_service_names);
      setIphoneModels(res.data.iphone_models);
    } catch (err) {
      console.error(err);
    }
  };

  const services = repairService.map((service, i) => (
    <div key={i} className="form-check form-check-reverse">
      <input
        className="form-check-input"
        type="radio"
        name="serviceOption"
        value={service}
        id={`reverseCheck${i}`}
        required
      />
      <label className="form-check-label" htmlFor={`reverseCheck${i}`}>
        {service}
      </label>
    </div>
  ));

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

    // Get the selected price
    const price = e.target.elements["priceInput"].value;

    // Get the selected service
    const selectedService = repairService.find(
      (service) =>
        document.getElementById(`reverseCheck${repairService.indexOf(service)}`)
          .checked
    );

    // Get the selected model
    const selectedModel = e.target.elements["الموديل"].value;

    // Create a data object to be sent
    const dataToSend = {
      service: selectedService,
      model: selectedModel,
      price: price,
    };

    try {
      // Send the data to the API
      const res = await api.post(`api/set-price/377?_method=PATCH`, {
        repair_service_name: dataToSend.service,
        iphone_model: dataToSend.model,
        price: dataToSend.price,
      });
      // console.log(dataToSend);

      // Reset the form fields
      e.target.reset();
      // Update the state with the new data
      setSelectedData(dataToSend);
      // Optionally, reset the state if needed
      setSelectedData({ service: "", model: "", price: "" });

      setLoading(false);

      toast.success("Price has been updated.");
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
          <h1>تعديل السعر</h1>
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

                  {/* <option dir="rtl" value>
                  اختر أحد الخيارات
                </option>
                <option dir="ltr" value="iPhone 15 Pro Max">
                  iPhone 15 Pro Max
                </option>
                <option dir="ltr" value="iPhone 15 Pro">
                  iPhone 15 Pro
                </option>
                <option dir="ltr" value="iPhone 15 Plus">
                  iPhone 15 Plus
                </option>
                <option dir="ltr" value="iPhone 15">
                  iPhone 15
                </option>
                <option dir="ltr" value="iPhone 14 Pro Max">
                  iPhone 14 Pro Max
                </option>
                <option dir="ltr" value="iPhone 14 Pro">
                  iPhone 14 Pro
                </option>
                <option dir="ltr" value="iPhone 14 Plus">
                  iPhone 14 Plus
                </option>
                <option dir="ltr" value="iPhone 14">
                  iPhone 14
                </option>
                <option dir="ltr" value="iPhone 13 Pro Max">
                  iPhone 13 Pro Max
                </option>
                <option dir="ltr" value="iPhone 13 Pro">
                  iPhone 13 Pro
                </option>
                <option dir="ltr" value="iPhone 13 Mini">
                  iPhone 13 Mini
                </option>
                <option dir="ltr" value="iPhone 13">
                  iPhone 13
                </option>
                <option dir="ltr" value="iPhone 12 Pro Max">
                  iPhone 12 Pro Max
                </option>
                <option dir="ltr" value="iPhone 12 Pro">
                  iPhone 12 Pro
                </option>
                <option dir="ltr" value="iPhone 12 Mini">
                  iPhone 12 Mini
                </option>
                <option dir="ltr" value="iPhone 12">
                  iPhone 12
                </option>
                <option dir="ltr" value="iPhone 11 Pro Max">
                  iPhone 11 Pro Max
                </option>
                <option dir="ltr" value="iPhone 11 Pro">
                  iPhone 11 Pro
                </option>
                <option dir="ltr" value="iPhone 11">
                  iPhone 11
                </option>
                <option dir="ltr" value="iPhone XS Max">
                  iPhone XS Max
                </option>
                <option dir="ltr" value="iPhone XS">
                  iPhone XS
                </option>
                <option dir="ltr" value="iPhone XR">
                  iPhone XR
                </option>
                <option dir="ltr" value="iPhone X">
                  iPhone X
                </option>
                <option dir="ltr" value="iPhone 8 Plus">
                  iPhone 8 Plus
                </option>
                <option dir="ltr" value="iPhone 8">
                  iPhone 8
                </option>
                <option dir="ltr" value="iPhone 7 Plus">
                  iPhone 7 Plus
                </option>
                <option dir="ltr" value="iPhone 7">
                  iPhone 7
                </option>
                <option dir="ltr" value="iPhone 6s Plus">
                  iPhone 6S Plus
                </option>
                <option dir="ltr" value="iPhone 6s">
                  iPhone 6S
                </option>
                <option dir="ltr" value="iPhone 6 Plus">
                  iPhone 6 Plus
                </option>
                <option dir="ltr" value="iPhone 6">
                  iPhone 6
                </option>
                <optgroup dir="ltr" label="──────────" />
                <option value="iPad (7, 8, 9)" dir="ltr">
                  iPad (7, 8, 9)
                </option>
                <option value="iPad Air (1, 5, 6)" dir="ltr">
                  iPad Air (1, 5, 6)
                </option>
                <option value="iPad Pro (9.7), iPad Air (3)" dir="ltr">
                  iPad Pro (9.7), iPad Air (3)
                </option>
                <option value="iPad Mini (4, 5)" dir="ltr">
                  iPad Mini (4, 5)
                </option>
                <option value="iPad Air 2" dir="ltr">
                  iPad Air 2
                </option>
                <option value="iPad Air 4" dir="ltr">
                  iPad Air 4
                </option>
                <option value="iPad Mini 6" dir="ltr">
                  iPad Mini 6
                </option>
                <option value="iPad Pro 10.5" dir="ltr">
                  iPad Pro 10.5
                </option>
                <option value="iPad Pro 11-inch (2018)" dir="ltr">
                  iPad Pro 11-inch (2018)
                </option>
                <option value="iPad Pro 11-inch (2021)" dir="ltr">
                  iPad Pro 11-inch (2021)
                </option>
                <option value="iPad Air (4, 5)" dir="ltr">
                  iPad Air (4, 5)
                </option> */}
                </select>
              </div>
            </div>

            {/* الخدمات */}
            <div className="cust col-12 mb-4 vv">
              <div className="form-group cust-2">
                <h5 dir="rtl">الخدمة:</h5>
              </div>

              {services}

              {/* <div className="form-check form-check-reverse">
              <input
                className="form-check-input"
                type="radio"
                name="serviceOption"
                value="صيانة الشاشة"
                id="reverseCheck1"
              />
              <label className="form-check-label" htmlFor="reverseCheck1">
                صيانة الشاشة
              </label>
            </div>
            <div className="form-check form-check-reverse">
              <input
                className="form-check-input"
                type="radio"
                name="serviceOption"
                value="صيانة البطارية"
                id="reverseCheck2"
              />
              <label className="form-check-label" htmlFor="reverseCheck2">
                صيانة البطارية
              </label>
            </div>
            <div className="form-check form-check-reverse">
              <input
                className="form-check-input"
                type="radio"
                name="serviceOption"
                value="صيانة مدخل الشحن"
                id="reverseCheck3"
              />
              <label className="form-check-label" htmlFor="reverseCheck3">
                صيانة مدخل الشحن
              </label>
            </div>
            <div className="form-check form-check-reverse">
              <input
                className="form-check-input"
                type="radio"
                name="serviceOption"
                value="بكج حماية حراري كامل"
                id="reverseCheck9"
              />
              <label className="form-check-label" htmlFor="reverseCheck9">
                بكج حماية حراري كامل
              </label>
            </div>
            <div className="form-check form-check-reverse">
              <input
                className="form-check-input"
                type="radio"
                name="serviceOption"
                value="صيانه الكاميرا الخلفية"
                id="reverseCheck4"
              />
              <label className="form-check-label" htmlFor="reverseCheck4">
                صيانه الكاميرا الخلفية
              </label>
            </div>
            <div className="form-check form-check-reverse">
              <input
                className="form-check-input"
                type="radio"
                name="serviceOption"
                value="صيانة الكاميرا الأمامية"
                id="reverseCheck5"
              />
              <label className="form-check-label" htmlFor="reverseCheck5">
                صيانة الكاميرا الأمامية
              </label>
            </div>
            <div className="form-check form-check-reverse">
              <input
                className="form-check-input"
                type="radio"
                name="serviceOption"
                value="صيانة السماعات العلوية"
                id="reverseCheck6"
              />
              <label className="form-check-label" htmlFor="reverseCheck6">
                صيانة السماعات العلوية
              </label>
            </div>
            <div className="form-check form-check-reverse">
              <input
                className="form-check-input"
                type="radio"
                name="serviceOption"
                value="صيانه زجاج الكاميرا الخلفيه"
                id="reverseCheck7"
              />
              <label className="form-check-label" htmlFor="reverseCheck7">
                صيانه زجاج الكاميرا الخلفيه
              </label>
            </div>
            <div className="form-check form-check-reverse">
              <input
                className="form-check-input"
                type="radio"
                name="serviceOption"
                value="صيانة كسر الخلفية الزجاجية"
                id="reverseCheck8"
              />
              <label className="form-check-label" htmlFor="reverseCheck8">
                صيانة كسر الخلفية الزجاجية
              </label>
            </div> */}
            </div>

            {/* السعر */}
            <div className="col-12 mt-4 mb-4">
              <h5 dir="rtl">السعر:</h5>
              <input
                className="form-control"
                placeholder="أدخل السعر الجديد"
                type="number"
                dir="rtl"
                required
                name="priceInput"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary"
            >
              تعديل
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
