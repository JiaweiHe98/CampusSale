import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {TextField, Checkbox, FormControlLabel} from '@mui/material';
import {existsEmail, existsUsername, signUp} from "../util/signUp";
import {useNavigate} from "react-router-dom";
import BasicModal from "./BasicModal";

const steps = [
  {
    label: 'Choose your username and password',
  },
  {
    label: 'Set your contact information',
  },
  {
    label: 'Finish up',
  },
];

export default function VerticalLinearStepper() {
  const [open, setOpen] = React.useState(false);

  const [username, setUsername] = useState({value: '', valid: true, exists: false});
  const [password, setPassword] = useState({value: '', valid: true});
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    valid: true,
  });
  const [firstname, setFirstname] = useState({value: '', valid: true});
  const [lastname, setLastname] = useState({value: '', valid: true});
  const [email, setEmail] = useState({value: '', valid: true, exists: false});
  const [phoneNumber, setPhoneNumber] = useState({value: '', valid: true});

  const [agree, setAgree] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleUsernameExist = async () => {
      const res = await existsUsername(username.value);
      if (res !== username.exists) {
        setUsername({value: username.value, valid: username.valid, exists: res});
      }
      // console.log(res)
    }

    const timeOutId = setTimeout(() => handleUsernameExist(), 500);
    return () => clearTimeout(timeOutId);
  }, [username])

  useEffect(() => {
    const handleEmailExist = async () => {
      const res = await existsEmail(email.value);
      if (res !== email.exists) {
        setEmail({value: email.value, valid: email.valid, exists: res});
      }
      // console.log(res)
    }

    const timeOutId = setTimeout(() => handleEmailExist(), 500);
    return () => clearTimeout(timeOutId);
  }, [email])

  const [activeStep, setActiveStep] = useState(0);

  const step1Valid = (() => {
    const valid = username.valid && password.valid && confirmPassword.valid;
    const notEmpty =
      username.value !== '' &&
      password.value !== '' &&
      confirmPassword.value !== '';
    return valid && notEmpty && !username.exists;
  })();
  const step2Valid = (() => {
    const valid =
      firstname.valid && lastname.valid && email.valid && phoneNumber.valid;
    const notEmpty =
      firstname.value !== '' && lastname.value !== '' && email.value !== '';
    return valid && notEmpty && !email.exists;
  })();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUsername = (e) => {
    const userInput = e.target.value;
    const regex = /^[a-zA-Z0-9]+$/g;
    if (userInput.length >= 6 && userInput.match(regex) && userInput.length <= 48) {
      // console.log("Valid" + e.target.value)
      setUsername({value: e.target.value, valid: true, exists: username.exists});
    } else {
      // console.log("invalid" + e.target.value)
      setUsername({value: e.target.value, valid: false, exists: username.exists});
    }
  };


  const handlePassword = (e) => {
    const userInput = e.target.value;
    if (userInput.length >= 8 && userInput.length <= 100) {
      // console.log("Valid" + e.target.value)
      setPassword({value: e.target.value, valid: true});
    } else {
      // console.log("invalid" + e.target.value)
      setPassword({value: e.target.value, valid: false});
    }
  };

  const handleConfirmPassword = (e) => {
    const userInput = e.target.value;
    if (
      userInput.length >= 8 &&
      userInput.length <= 100 &&
      userInput === password.value
    ) {
      // console.log("Valid" + e.target.value)
      setConfirmPassword({value: e.target.value, valid: true});
    } else {
      // console.log("invalid" + e.target.value)
      setConfirmPassword({value: e.target.value, valid: false});
    }
  };

  const handleFirstname = (e) => {
    const userInput = e.target.value;
    const regex = /^[a-zA-Z]+$/g;
    if (userInput.length <= 100 && userInput.match(regex)) {
      // console.log("Valid" + e.target.value)
      setFirstname({value: e.target.value, valid: true});
    } else {
      // console.log("invalid" + e.target.value)
      setFirstname({value: e.target.value, valid: false});
    }
  };

  const handleLastname = (e) => {
    const userInput = e.target.value;
    const regex = /^[a-zA-Z]+$/g;
    if (userInput.length <= 100 && userInput.match(regex)) {
      // console.log("Valid" + e.target.value)
      setLastname({value: e.target.value, valid: true});
    } else {
      // console.log("invalid" + e.target.value)
      setLastname({value: e.target.value, valid: false});
    }
  };

  const handleEmail = (e) => {
    const userInput = e.target.value;
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (userInput.length <= 100 && userInput.match(regex)) {
      // console.log("Valid" + e.target.value)
      setEmail({value: e.target.value, valid: true, exists: email.exists});
    } else {
      // console.log("invalid" + e.target.value)
      setEmail({value: e.target.value, valid: false, exists: email.exists});
    }
  };

  const handlePhoneNumber = (e) => {
    const userInput = e.target.value;
    const regex = /[0-9]{10}/g;
    if (
      (userInput.length === 10 && userInput.match(regex)) ||
      userInput === ''
    ) {
      // console.log("Valid" + e.target.value)
      setPhoneNumber({value: e.target.value, valid: true});
    } else {
      // console.log("invalid" + e.target.value)
      setPhoneNumber({value: e.target.value, valid: false});
    }
  };

  const handleAgree = (e) => {
    setAgree(e.target.checked);
  };

  const handleFinish = async () => {
    const appUser = {
      firstname: firstname.value,
      lastname: lastname.value,
      username: username.value,
      password: password.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
    };

    const res = await signUp(appUser);
    if (res.status === 201) {
      navigate("/login")
      return true
    } else {
      handleOpen()
      return false
    }
  };

  const handleNext = async () => {
    if (activeStep === 2) {
      const res = await handleFinish();
      if (res) {
        return
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const step1 = (
    <Box>
      <TextField
        fullWidth
        required
        id="username"
        sx={{mb: '1rem'}}
        label={username.valid ? username.exists ? "Username already exist" : "Username" : 'Username should be alphanumeric string between 6 ~ 48!'}
        value={username.value}
        error={!username.valid || username.exists}
        onChange={handleUsername}
      />
      <TextField
        fullWidth
        required
        id="password"
        className="txtPassword"
        sx={{mb: '1rem'}}
        label={
          password.valid ? 'Password' : 'Password length should between 8 ~ 100'
        }
        value={password.value}
        error={!password.valid}
        onChange={handlePassword}
      />
      <TextField
        fullWidth
        required
        id="confirm-password"
        className="txtPassword"
        sx={{mb: '1rem'}}
        label={
          confirmPassword.valid ? 'Confirm Password' : 'Password does not match'
        }
        value={confirmPassword.value}
        error={!confirmPassword.valid}
        onChange={handleConfirmPassword}
      />
    </Box>
  );

  const step2 = (
    <Box>
      <TextField
        fullWidth
        required
        id="firstname"
        sx={{mb: '1rem'}}
        label={firstname.valid ? 'Firstname' : 'Please enter valid firstname'}
        value={firstname.value}
        error={!firstname.valid}
        onChange={handleFirstname}
      />
      <TextField
        fullWidth
        required
        id="lastname"
        sx={{mb: '1rem'}}
        label={lastname.valid ? 'Lastname' : 'Please enter valid lastname'}
        value={lastname.value}
        error={!lastname.valid}
        onChange={handleLastname}
      />
      <TextField
        fullWidth
        required
        id="email"
        sx={{mb: '1rem'}}
        label={email.valid ? email.exists ? 'Email already exist' : 'Email' : 'Please enter valid email'}
        value={email.value}
        error={!email.valid || email.exists}
        onChange={handleEmail}
      />
      <TextField
        fullWidth
        id="phone"
        label={phoneNumber.valid ? 'Phone' : 'Please enter valid phone number'}
        value={phoneNumber.value}
        error={!phoneNumber.valid}
        onChange={handlePhoneNumber}
      />
    </Box>
  );

  const step3 = (
    <Box>
      <Typography variant="body1">
        Please do respect others and not abuse the system!
      </Typography>
      <FormControlLabel
        control={<Checkbox checked={agree} onChange={handleAgree}/>}
        label="I agree."
      />
    </Box>
  );

  return (
    <>
      <BasicModal open={open} handleClose={handleClose} messageTitle={'Sign failed!'}
                  message={'Please check your information format and internet connection before retry!.'} buttonTitle={'OK'}/>
      <Box>
        <Typography variant="h4" sx={{pl: '2rem'}}>
          Sign Up
        </Typography>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                {index === 0 && step1}
                {index === 1 && step2}
                {index === 2 && step3}
                <Box sx={{mb: 2}}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{mt: 1, mr: 1}}
                      disabled={
                        !(index === 0
                          ? step1Valid
                          : index === 1
                            ? step2Valid
                            : agree)
                      }
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{mt: 1, mr: 1}}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{p: 3}}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{mt: 1, mr: 1}}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </>

  );
}
