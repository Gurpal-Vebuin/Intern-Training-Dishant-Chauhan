import {
  Description,
  ReportCard,
  ReportWrapper,
  Title,
} from "../../styles/report/ReportStyles";
import useLanguage from "../../../hooks/useLanguage"; 

const Report = () => {
  const { t } = useLanguage();

  return (
    <ReportWrapper>
      <ReportCard>
        <Title>{t("Report.Title")}</Title>
        <Description>{t("Report.Description")}</Description>
      </ReportCard>
    </ReportWrapper>
  );
};

export default Report;
