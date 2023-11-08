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
  organizationName: string;
  designation: string;
  employmentType: string;
  joiningDate: string;
  workedTill: string;
  jobProfile: string;
}

interface IFormInput {
  employment: IEmployment[];
}

type StepTwoFormProps = {
  onBack?: () => void;
  onSubmit: () => void;
};

const StepTwoForm: FC<StepTwoFormProps> = ({ onBack, onSubmit }) => {
  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: {
      employment: [
        {
          organizationName: "",
          designation: "",
          employmentType: "",
          joiningDate: "",
          workedTill: "",
          jobProfile: "",
        },
      ],
    },
  });
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "employment",
    control,
  });

  const addEmployment = () => {
    append({
      organizationName: "",
      designation: "",
      employmentType: "",
      joiningDate: "",
      workedTill: "",
      jobProfile: "",
    });
  };

  const submitData: SubmitHandler<IFormInput> = (data) => {
    localStorage.setItem("workExperienceData", JSON.stringify(data));
    onSubmit && onSubmit();
  };

  return (
    <form className="custom-form" noValidate autoComplete="off" onSubmit={handleSubmit(submitData)}>
      <Grid container spacing="20px">
        <Grid item xs={12} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          <p className="custom-form-section-label">Employment:</p>
          <Button variant="contained" type="button" disableElevation size="small" onClick={addEmployment}>
            Add
          </Button>
        </Grid>
        <Grid item xs={12}>
          {fields.map((field, index) => {
            const organizationNameId = `employment.${index}.organizationName` as const;
            const designationId = `employment.${index}.designation` as const;
            const employmentTypeId = `employment.${index}.employmentType` as const;
            const joiningDateId = `employment.${index}.joiningDate` as const;
            const workedTillId = `employment.${index}.workedTill` as const;
            const jobProfileId = `employment.${index}.jobProfile` as const;

            return (
              <div className="employment-section" key={field.id}>
                <Grid container spacing="20">
                  <Grid item xs={12} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                    <p className="custom-form-section-label">S.No {index + 1} :</p>
                    {index > 0 && (
                      <Button variant="contained" type="button" color="error" disableElevation size="small" onClick={() => remove(index)}>
                        Delete
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id={organizationNameId}
                      label="Organization Name *"
                      type="text"
                      {...register(organizationNameId, {
                        required: "Organization name is required",
                      })}
                      error={!!errors?.employment?.[index]?.organizationName}
                      helperText={errors?.employment?.[index]?.organizationName?.message}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id={designationId}
                      label="Designation *"
                      type="text"
                      {...register(designationId, {
                        required: "Designation is required",
                      })}
                      error={!!errors?.employment?.[index]?.designation}
                      helperText={errors?.employment?.[index]?.designation?.message}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors?.employment?.[index]?.employmentType} size="small">
                      <InputLabel id="employment-type-label">Employment Type</InputLabel>
                      <Select
                        labelId="employment-type-label"
                        id={employmentTypeId}
                        label="Exployment Type *"
                        defaultValue=""
                        {...register(employmentTypeId, {
                          required: false,
                        })}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"fulltime"}>Full-time</MenuItem>
                        <MenuItem value={"parttime"}>Part-time</MenuItem>
                        <MenuItem value={"internship"}>Intership</MenuItem>
                      </Select>
                      <FormHelperText>{errors?.employment?.[index]?.employmentType?.message}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id={joiningDateId}
                      label="Joining Date *"
                      type="date"
                      {...register(joiningDateId, {
                        required: "Joining date is required",
                      })}
                      InputLabelProps={{ shrink: true }}
                      error={!!errors?.employment?.[index]?.joiningDate}
                      helperText={errors?.employment?.[index]?.joiningDate?.message}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id={workedTillId}
                      label="Worked Till *"
                      type="date"
                      {...register(workedTillId, {
                        required: "Worked till date is required",
                      })}
                      InputLabelProps={{ shrink: true }}
                      error={!!errors?.employment?.[index]?.workedTill}
                      helperText={errors?.employment?.[index]?.workedTill?.message}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id={jobProfileId}
                      label="Job Profile"
                      type="text"
                      {...register(jobProfileId, {
                        required: false,
                      })}
                      error={!!errors?.employment?.[index]?.jobProfile}
                      helperText={errors?.employment?.[index]?.jobProfile?.message}
                      fullWidth
                      size="small"
                      multiline
                      rows={4}
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

export default StepTwoForm;
