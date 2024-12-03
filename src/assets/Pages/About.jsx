import "./Styles/About.css";
import santinoIcon from '../Images/Svg/loginImage.svg'; 
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="margin"></div>
      <div className="about-us">
        <div className="about-container">
          <h1>
            {t("what_are_we")} <span id="violetMedium">?</span>
          </h1>
          <p>
            {t("welcome_message")}
          </p>
        </div>
        <div className="team">
          <h2>{t("meet_our_developers")}</h2>
          <div className="team-cards">
            <div className="card">
              <img src={santinoIcon} alt="" />
              <h3>{t("santino_name")}</h3>
              <p>
                <strong>{t("role")}: </strong> {t("role_front_end")}
              </p>
              <p>
                {t("santino_description")}
              </p>
            </div>
            <div className="card">
              <img src={santinoIcon} alt="" />
              <h3>{t("eze_name")}</h3>
              <p>
                <strong>{t("role")}: </strong> {t("role_ux_ui")}
              </p>
              <p>
                {t("eze_description")}
              </p>
            </div>
            <div className="card">
              <img src={santinoIcon} alt="" />
              <h3>{t("juan_name")}</h3>
              <p>
                <strong>{t("role")}: </strong> {t("role_back_end")}
              </p>
              <p>
                {t("juan_description")}
              </p>
            </div>
            <div className="card">
              <img src={santinoIcon} alt="" />
              <h3>{t("mateo_name")}</h3>
              <p>
                <strong>{t("role")}: </strong> {t("role_documentation_manager")}
              </p>
              <p>
                {t("mateo_description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
