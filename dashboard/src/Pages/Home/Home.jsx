import style from "./Home.module.scss";
import logo from "../../Assets/Images/logo.png";

export default function Home() {
  return (
    <div className={style.container}>
      <div>
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
}
