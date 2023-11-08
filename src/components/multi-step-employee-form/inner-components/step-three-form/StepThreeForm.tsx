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

interface IEducation {
  educationType: string;
  universityName: string;
  course: string;
  courseType: string;
  startDate: string;
  endDate: string;
}

interface IFormInput {
  education: IEducation[];
}

type StepThreeFormProps = {
  onBack?: () => void;
  onSubmit: () => void;
};

const StepThreeForm: FC<StepThreeFormProps> = ({ onBack, onSubmit }) => {
  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: {
      education: [
        {
          educationType: "",
          universityName: "",
          course: "",
          courseType: "",
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

  const addEducation = () => {
    append({
      educationType: "",
      universityName: "",
      course: "",
      courseType: "",
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
          <Button variant="contained" type="button" disableElevation size="small" onClick={addEducation}>
            Add
          </Button>
        </Grid>
        <Grid item xs={12}>
          {fields.map((field, index) => {
            const universityNameId = `education.${index}.universityName` as const;
            const courseId = `education.${index}.course` as const;
            const courseTypeId = `education.${index}.courseType` as const;
            const educationTypeId = `education.${index}.educationType` as const;
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
                    <FormControl fullWidth error={!!errors?.education?.[index]?.educationType} size="small">
                      <InputLabel id="education-type-label">Education Type *</InputLabel>
                      <Select
                        labelId="education-type-label"
                        id={educationTypeId}
                        label="Education Type *"
                        defaultValue=""
                        {...register(educationTypeId, {
                          required: "Education type is required",
                        })}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"phd"}>Phd</MenuItem>
                        <MenuItem value={"post-graduation"}>Post-Graduation</MenuItem>
                        <MenuItem value={"graduation"}>Graduation</MenuItem>
                        <MenuItem value={"12th"}>12th</MenuItem>
                        <MenuItem value={"10th"}>10th</MenuItem>
                      </Select>
                      <FormHelperText>{errors?.education?.[index]?.educationType?.message}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id={universityNameId}
                      label="University/Institute Name *"
                      type="text"
                      {...register(universityNameId, {
                        required: "University/Institute name is required",
                      })}
                      error={!!errors?.education?.[index]?.universityName}
                      helperText={errors?.education?.[index]?.universityName?.message}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id={courseId}
                      label="Course *"
                      type="text"
                      {...register(courseId, {
                        required: "Course is required",
                      })}
                      error={!!errors?.education?.[index]?.course}
                      helperText={errors?.education?.[index]?.course?.message}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors?.education?.[index]?.courseType} size="small">
                      <InputLabel id="course-type-label">Course Type *</InputLabel>
                      <Select
                        labelId="course-type-label"
                        id={courseTypeId}
                        label="Course Type *"
                        defaultValue=""
                        {...register(courseTypeId, {
                          required: "Course type is required",
                        })}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"phd"}>Full time</MenuItem>
                        <MenuItem value={"post-graduation"}>Part time</MenuItem>
                        <MenuItem value={"distance"}>Distance learning</MenuItem>
                      </Select>
                      <FormHelperText>{errors?.education?.[index]?.courseType?.message}</FormHelperText>
                    </FormControl>
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

export default StepThreeForm;
