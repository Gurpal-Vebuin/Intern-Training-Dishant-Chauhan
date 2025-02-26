import React from "react";
import {
  Description,
  ReportCard,
  ReportWrapper,
  Title,
} from "../../styles/report/ReportStyles";
import useLanguage from "../../../hooks/useLanguage"; // Ensure this hook is correctly implemented

const Report = () => {
  const { t } = useLanguage(); // Make sure useLanguage returns a function for translations

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
