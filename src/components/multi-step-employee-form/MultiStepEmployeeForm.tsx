import CustomStepper from "../custom-stepper/CustomStepper";
import "./MultiStepEmployeeForm.scss";

const MultiStepEmployeeForm = () => {
  return (
    <div className="msef-section">
      <CustomStepper activeStep={0} />
    </div>
  );
};

export default MultiStepEmployeeForm;
