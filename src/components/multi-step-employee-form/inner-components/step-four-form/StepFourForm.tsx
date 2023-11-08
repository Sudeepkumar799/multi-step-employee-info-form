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
  experienceYears: string;
  experienceMonths: string;
}

interface IFormInput {
  skills: IEmployment[];
}

type StepFourFormProps = {
  onBack?: () => void;
  onSubmit: () => void;
};

const StepFourForm: FC<StepFourFormProps> = ({ onBack, onSubmit }) => {
  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: {
      skills: [
        {
          skillName: "",
          version: "",
          lastUsed: "",
          experienceYears: "",
          experienceMonths: "",
        },
      ],
    },
  });
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "skills",
    control,
  });

  const addEmployment = () => {
    append({
      skillName: "",
      version: "",
      lastUsed: "",
      experienceYears: "",
      experienceMonths: "",
    });
  };

  const submitData: SubmitHandler<IFormInput> = (data) => {
    localStorage.setItem("skillsData", JSON.stringify(data));
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
            const skillNameId = `skills.${index}.skillName` as const;
            const versionId = `skills.${index}.version` as const;
            const lastUsedId = `skills.${index}.lastUsed` as const;
            const experienceYearsId = `skills.${index}.experienceYears` as const;
            const experienceMothsId = `skills.${index}.experienceMonths` as const;

            return (
              <div className="skills-section" key={field.id}>
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
                      error={!!errors?.skills?.[index]?.skillName}
                      helperText={errors?.skills?.[index]?.skillName?.message}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id={versionId}
                      label="Version"
                      type="text"
                      {...register(versionId, {
                        required: false,
                      })}
                      error={!!errors?.skills?.[index]?.version}
                      helperText={errors?.skills?.[index]?.version?.message}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth error={!!errors?.skills?.[index]?.lastUsed} size="small">
                      <InputLabel id="last-used-label">Last Used</InputLabel>
                      <Select
                        labelId="last-used-label"
                        id={lastUsedId}
                        label="Last Used"
                        defaultValue=""
                        {...register(lastUsedId, {
                          required: false,
                        })}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={2023}>2023</MenuItem>
                        <MenuItem value={2022}>2022</MenuItem>
                        <MenuItem value={2021}>2021</MenuItem>
                        <MenuItem value={2020}>2020</MenuItem>
                        <MenuItem value={2019}>2019</MenuItem>
                        <MenuItem value={2018}>2018</MenuItem>
                        <MenuItem value={2017}>2017</MenuItem>
                        <MenuItem value={2016}>2016</MenuItem>
                      </Select>
                      <FormHelperText>{errors?.skills?.[index]?.lastUsed?.message}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <p>Experience :</p>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth error={!!errors?.skills?.[index]?.experienceYears} size="small">
                      <InputLabel id="exp-years-label">Years</InputLabel>
                      <Select
                        labelId="exp-years-label"
                        id={experienceYearsId}
                        label="Years"
                        defaultValue=""
                        {...register(experienceYearsId, {
                          required: false,
                        })}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={0}>0 Year</MenuItem>
                        <MenuItem value={1}>1 Years</MenuItem>
                        <MenuItem value={2}>2 Years</MenuItem>
                        <MenuItem value={3}>3 Years</MenuItem>
                        <MenuItem value={4}>4 Years</MenuItem>
                        <MenuItem value={5}>5 Years</MenuItem>
                      </Select>
                      <FormHelperText>{errors?.skills?.[index]?.experienceYears?.message}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth error={!!errors?.skills?.[index]?.experienceMonths} size="small">
                      <InputLabel id="exp-months-label">Months</InputLabel>
                      <Select
                        labelId="exp-months-label"
                        id={experienceMothsId}
                        label="Months"
                        defaultValue=""
                        {...register(experienceMothsId, {
                          required: false,
                        })}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={0}>0 Months</MenuItem>
                        <MenuItem value={1}>1 Months</MenuItem>
                        <MenuItem value={2}>2 Months</MenuItem>
                        <MenuItem value={3}>3 Months</MenuItem>
                        <MenuItem value={4}>4 Months</MenuItem>
                        <MenuItem value={5}>5 Months</MenuItem>
                        <MenuItem value={6}>6 Months</MenuItem>
                        <MenuItem value={7}>7 Months</MenuItem>
                        <MenuItem value={8}>8 Months</MenuItem>
                        <MenuItem value={9}>9 Months</MenuItem>
                        <MenuItem value={10}>10 Months</MenuItem>
                        <MenuItem value={11}>11 Months</MenuItem>
                      </Select>
                      <FormHelperText>{errors?.skills?.[index]?.experienceMonths?.message}</FormHelperText>
                    </FormControl>
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
