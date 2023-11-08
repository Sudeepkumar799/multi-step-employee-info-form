import { FC } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

interface IEmployment {
  skillName: string;
  version: string;
  lastUsed: string;
  startDate: string;
  endDate: string;
}

interface IFormInput {
  education: IEmployment[];
}

type StepFourFormProps = {
  onBack?: () => void;
  onSubmit: () => void;
};

const StepFourForm: FC<StepFourFormProps> = ({ onBack, onSubmit }) => {
  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: {
      education: [
        {
          skillName: "",
          version: "",
          lastUsed: "",
          startDate: "",
          endDate: "",
        },
      ],
    },
  });
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "education",
    control,
  });

  const addEmployment = () => {
    append({
      skillName: "",
      version: "",
      lastUsed: "",
      startDate: "",
      endDate: "",
    });
  };

  const submitData: SubmitHandler<IFormInput> = (data) => {
    localStorage.setItem("educationData", JSON.stringify(data));
    onSubmit && onSubmit();
  };

  return (
    <form className="custom-form" noValidate autoComplete="off" onSubmit={handleSubmit(submitData)}>
      <Grid container spacing="20px">
        <Grid item xs={12} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          <p className="custom-form-section-label">Education:</p>
          <Button variant="contained" type="button" disableElevation size="small" onClick={addEmployment}>
            Add
          </Button>
        </Grid>
        <Grid item xs={12}>
          {fields.map((field, index) => {
            const skillNameId = `education.${index}.skillName` as const;
            const versionId = `education.${index}.version` as const;
            const lastUsedId = `education.${index}.lastUsed` as const;
            const startDateId = `education.${index}.startDate` as const;
            const endDateId = `education.${index}.endDate` as const;

            return (
              <div className="education-section" key={field.id}>
                <Grid container spacing="20">
                  <Grid item xs={12} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                    <p className="custom-form-section-label">S.No {index + 1} :</p>
                    {index > 0 && (
                      <Button variant="contained" type="button" color="error" disableElevation size="small" onClick={() => remove(index)}>
                        Delete
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id={skillNameId}
                      label="Skill Name *"
                      type="text"
                      {...register(skillNameId, {
                        required: "Skill name is required",
                      })}
                      error={!!errors?.education?.[index]?.skillName}
                      helperText={errors?.education?.[index]?.skillName?.message}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id={versionId}
                      label="Version *"
                      type="text"
                      {...register(versionId, {
                        required: "Version is required",
                      })}
                      error={!!errors?.education?.[index]?.version}
                      helperText={errors?.education?.[index]?.version?.message}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth error={!!errors?.education?.[index]?.lastUsed} size="small">
                      <InputLabel id="last-used-label">Last Used *</InputLabel>
                      <Select
                        labelId="last-used-label"
                        id={lastUsedId}
                        label="Last Used *"
                        defaultValue=""
                        {...register(lastUsedId, {
                          required: "Last used is required",
                        })}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"phd"}>Full time</MenuItem>
                        <MenuItem value={"post-graduation"}>Part time</MenuItem>
                        <MenuItem value={"distance"}>Distance learning</MenuItem>
                      </Select>
                      <FormHelperText>{errors?.education?.[index]?.lastUsed?.message}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <p>Experience :</p>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id={startDateId}
                      label="Start Date *"
                      type="date"
                      {...register(startDateId, {
                        required: "Start date is required",
                      })}
                      InputLabelProps={{ shrink: true }}
                      error={!!errors?.education?.[index]?.startDate}
                      helperText={errors?.education?.[index]?.startDate?.message}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id={endDateId}
                      label="End Date *"
                      type="date"
                      {...register(endDateId, {
                        required: "End date is required",
                      })}
                      InputLabelProps={{ shrink: true }}
                      error={!!errors?.education?.[index]?.endDate}
                      helperText={errors?.education?.[index]?.endDate?.message}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </Grid>
        <Grid item xs={12} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
          <Button variant="contained" type="button" disableElevation onClick={() => onBack && onBack()}>
            Go Back
          </Button>
          <Button variant="contained" type="submit" disableElevation>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default StepFourForm;
