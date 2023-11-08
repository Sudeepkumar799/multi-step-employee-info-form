import { FC } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  maritalStatus: string;
  address: string;
  emailId: string;
  mobileNumber: string;
}

type StepOneFormProps = {
  onSubmit: () => void;
};

const StepOneForm: FC<StepOneFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      maritalStatus: "",
      address: "",
      emailId: "",
      mobileNumber: "",
    },
  });
  const { errors } = formState;

  const submitData: SubmitHandler<IFormInput> = (data) => {
    localStorage.setItem("personalInformationData", JSON.stringify(data));
    onSubmit && onSubmit();
  };

  return (
    <form className="custom-form" noValidate autoComplete="off" onSubmit={handleSubmit(submitData)}>
      <Grid container spacing="20px">
        <Grid item xs={12}>
          <p className="custom-form-section-label">Basic Information:</p>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="firstName"
            label="First Name *"
            type="text"
            {...register("firstName", {
              required: "First name is required",
            })}
            error={!!errors.firstName}
            helperText={errors?.firstName?.message}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="lastName"
            label="Last Name *"
            type="text"
            {...register("lastName", {
              required: "Last name is required",
            })}
            error={!!errors.lastName}
            helperText={errors?.lastName?.message}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="dob"
            label="Date of Birth *"
            type="date"
            {...register("dob", {
              required: "Date of birth is required",
            })}
            InputLabelProps={{ shrink: true }}
            error={!!errors.dob}
            helperText={errors?.dob?.message}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth error={!!errors.gender} size="small">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              label="Gender"
              defaultValue=""
              {...register("gender", {
                required: false,
              })}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"others"}>Others</MenuItem>
            </Select>
            <FormHelperText>{errors?.gender?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth error={!!errors.maritalStatus} size="small">
            <InputLabel id="maritalStatus-label">Marital Status</InputLabel>
            <Select
              labelId="maritalStatus-label"
              id="maritalStatus"
              label="Marital Status"
              defaultValue=""
              {...register("maritalStatus", {
                required: false,
              })}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"single"}>Single</MenuItem>
              <MenuItem value={"married"}>Married</MenuItem>
            </Select>
            <FormHelperText>{errors?.maritalStatus?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <p className="custom-form-section-label">Contact Information:</p>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address"
            label="Full Address *"
            type="text"
            {...register("address", {
              required: "Address is required",
            })}
            error={!!errors.address}
            helperText={errors?.address?.message}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="emailId"
            label="Email ID *"
            type="email"
            {...register("emailId", {
              required: "Email id is required",
            })}
            error={!!errors.emailId}
            helperText={errors?.emailId?.message}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="mobileNumber"
            label="Mobile Number *"
            type="text"
            {...register("mobileNumber", {
              required: "Mobile number is required",
            })}
            error={!!errors.mobileNumber}
            helperText={errors?.mobileNumber?.message}
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start">+91-</InputAdornment>,
            }}
            size="small"
          />
        </Grid>
        <Grid item xs={12} display="flex" flexDirection="row" justifyContent="flex-end">
          <Button variant="contained" type="submit" disableElevation>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default StepOneForm;
