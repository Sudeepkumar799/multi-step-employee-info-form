import { useReducer } from "react";
import CustomStepper from "../custom-stepper/CustomStepper";
import "./MultiStepEmployeeForm.scss";
import StepOneForm from "./inner-components/step-one-form/StepOneForm";
import StepTwoForm from "./inner-components/step-two-form/StepTwoForm";

type Action = {
  type: string;
  payload: number;
};

type InitialStateProps = {
  activeStep: number;
};

const initialState: InitialStateProps = {
  activeStep: 1,
};

const reducer = (state: InitialStateProps, action: Action) => {
  switch (action.type) {
    case "UPDATE_ACTIVE_STEP":
      return {
        ...state,
        activeStep: action.payload,
      };
    default:
      return state;
  }
};

const MultiStepEmployeeForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { activeStep } = state;

  const updateActiveStep = (num: number) => {
    dispatch({
      type: "UPDATE_ACTIVE_STEP",
      payload: num,
    });
  };

  const handleStepOneSubmit = () => {
    updateActiveStep(1);
  };

  const handleGoBack = () => {
    updateActiveStep(activeStep - 1);
  };

  return (
    <div className="msef-section">
      <CustomStepper activeStep={activeStep} />
      <div className="msef-section-content">
        {activeStep === 0 && <StepOneForm onSubmit={handleStepOneSubmit} />}
        {activeStep === 1 && <StepTwoForm onBack={handleGoBack} onSubmit={handleStepOneSubmit} />}
      </div>
    </div>
  );
};

export default MultiStepEmployeeForm;
