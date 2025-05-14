import ArrowBack from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import Lock from '@mui/icons-material/Lock';
import Phone from '@mui/icons-material/Phone';
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  colors,
  Dialog,
  Fade,
  IconButton,
  Link,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { SetLoginModel, SetToken, SetUser, setLoginType } from '../AllStoreSlice/LoginSlice';
import { PostOtpSender, PostVerifyOtp } from '../AllPostApi';
import { ErrorHandle } from '../ErrorHandle';



export default function RenderUserLoginModal() {

  const [phone, setPhone] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({ phone: '', otp: '' });
  const dispatch = useDispatch();

  const { LoginModel: open, user } = useSelector((state: RootState) => state.LoginSlice);

  const validatePhone = () => {
    if (!/^\d{10}$/.test(phone)) {
      setErrors({ ...errors, phone: 'Invalid phone number' });
      return false;
    }
    return true;
  };

  const validateOtp = () => {
    if (!/^\d{4}$/.test(otp)) {
      setErrors({ ...errors, otp: 'OTP must be 4 digits' });
      return false;
    }
    return true;
  };


  const { mutateAsync: sendOtp } = PostOtpSender();
  const { mutateAsync: verifyOtp } = PostVerifyOtp();

  const handleSendOtp = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (!validatePhone()) return;
    try {
      const res = await sendOtp({ data: Number(phone) });
      const otp = res?.data?.otp;
      setOtp(otp);
      setLoading(false);
    } catch (error: any) {
      ErrorHandle(error.response)
      setLoading(false);
    }



    setStep(2);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateOtp()) return;
    setLoading(true);
    try {
      const res = await verifyOtp({
        data: Number(otp),
        phone: Number(phone),
      });
      dispatch(SetUser(res?.data?.user))
      dispatch(SetToken(res?.data?.user?.token))
      dispatch(setLoginType("USER"))
      setLoading(false);
  
      handleClose();
    } catch (error: any) {
      ErrorHandle(error.response)
    }
  };

  const handleClose = () => {
    dispatch(SetLoginModel(false));

  };

  React.useEffect(() => {
    if (user?.id) {
      handleClose();
    }
  }, [open]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}

    >
      <AppBar sx={{ position: 'relative', bgcolor: 'background.paper' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {step === 1 ? 'Phone Verification' : 'OTP Verification'}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
        mt: 8
      }}>
        <Lock sx={{ fontSize: 40, color: colors.green[200], mb: 2 }} />

        {step === 1 ? (
          <Fade in={step === 1}>
            <Box component="form" onSubmit={handleSendOtp} sx={{ width: '100%', maxWidth: 400 }}>
              <TextField
                fullWidth
                variant="outlined"
                label="Phone Number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setErrors({ ...errors, phone: '' });
                }}
                error={!!errors.phone}
                helperText={errors.phone}
                InputProps={{
                  startAdornment: <Phone sx={{ mr: 1, color: 'action.active' }} />
                }}
                placeholder="Enter 10-digit phone number"
                type="tel"
                sx={{ mb: 3 }}
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
                size="large"
                sx={{
                  bgcolor: colors.green[400],
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Send OTP'
                )}
              </Button>
              <Box sx={{
                width: "100%", display: "flex", justifyContent: 'end'
              }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleClose}
                  sx={{
                    mt: 2,
                    bgcolor: colors.red[200],
                  }}>Close</Button>
              </Box>
            </Box>

          </Fade>
        ) : (
          <Fade in={step === 2}>
            <Box component="form" onSubmit={handleVerifyOtp} sx={{ width: '100%', maxWidth: 400 }}>
              <Button
                startIcon={<ArrowBack />}
                onClick={() => setStep(1)}
                sx={{ mb: 2, color: colors.green[400], }}
              >
                Change Number
              </Button>

              <TextField
                fullWidth
                variant="outlined"
                label="OTP"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setErrors({ ...errors, otp: '' });
                }}
                error={!!errors.otp}
                helperText={errors.otp}
                placeholder="Enter 4-digit OTP"
                type="number"
                sx={{ mb: 3 }}
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
                size="large"
                sx={{
                  bgcolor: colors.green[400],
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Verify OTP'
                )}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2, }}>
                <Link href="#" variant="body2" >
                  <span style={{ color: colors.green[400], cursor: "pointer" }}>
                    Resend OTP
                  </span>
                </Link>
              </Box>
              <Box sx={{
                width: "100%", display: "flex", justifyContent: 'end'
              }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleClose}
                  sx={{
                    mt: 2,
                    bgcolor: colors.red[200],
                  }}>Close</Button>
              </Box>
            </Box>

          </Fade>
        )}
      </Box>
    </Dialog >
  );
}