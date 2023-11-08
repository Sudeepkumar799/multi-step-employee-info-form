import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { FC } from "react";

const steps = ["Personal Information", "Work Experience", "Education", "Skills"];

type CustomStepperProps = {
  activeStep: number;
};

const CustomStepper: FC<CustomStepperProps> = ({ activeStep }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CustomStepper;
