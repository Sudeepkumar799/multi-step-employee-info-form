import { useReducer } from "react";
import CustomStepper from "../custom-stepper/CustomStepper";
import StepOneForm from "./inner-components/step-one-form/StepOneForm";
import StepTwoForm from "./inner-components/step-two-form/StepTwoForm";
import StepThreeForm from "./inner-components/step-three-form/StepThreeForm";
import StepFourForm from "./inner-components/step-four-form/StepFourForm";
import "./MultiStepEmployeeForm.scss";

type Action = {
  type: string;
  payload: number;
};

type InitialStateProps = {
  activeStep: number;
};

const initialState: InitialStateProps = {
  activeStep: 0,
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

  const goToNext = () => {
    updateActiveStep(activeStep + 1);
  };

  const handleGoBack = () => {
    updateActiveStep(activeStep - 1);
  };

  const handleFinalFormSubmit = () => {
    alert("Employee information is submitted! Thank You.");
    setTimeout(() => {
      updateActiveStep(0);
      localStorage.clear();
    }, 3000);
  };

  return (
    <div className="msef-section">
      <CustomStepper activeStep={activeStep} />
      <div className="msef-section-content">
        {activeStep === 0 && <StepOneForm onSubmit={goToNext} />}
        {activeStep === 1 && <StepTwoForm onBack={handleGoBack} onSubmit={goToNext} />}
        {activeStep === 2 && <StepThreeForm onBack={handleGoBack} onSubmit={goToNext} />}
        {activeStep === 3 && <StepFourForm onBack={handleGoBack} onSubmit={handleFinalFormSubmit} />}
      </div>
    </div>
  );
};

export default MultiStepEmployeeForm;
