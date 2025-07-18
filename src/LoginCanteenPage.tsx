import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Stack,
  colors,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  setLoginCanteenData,
  setLoginCanteenUser,
  setLoginCanteenUserToken,
} from "./AllStoreSlice/LoginCanteenUserSlice";
import { PostOtpSender, PostVerifyOtp } from "./AllPostApi";
import { ErrorHandle } from "./ErrorHandle";

// 🖼️ Your image
import img from "../src/assets/ingredients-near-pizza_23-2147772081.avif";
import bgimg from "../src/assets/pngwing.com1_.webp";
import { Forward } from "@mui/icons-material";

// ✅ Zod Schema
const loginSchema = z.object({
  phone: z.string().min(10, "Phone must be 10 digits").max(10),
  otp: z.string().optional(),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

const LoginCanteenPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signInPage, setSignInPage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    getValues,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      otp: "",
    },
  });

  const { mutateAsync: OtpSender, isPending } = PostOtpSender();
  const { mutateAsync: VerifyOtp, isPending: isPendingVerify } = PostVerifyOtp();

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const res = await OtpSender({ data: Number(data.phone) });
      if (res?.status === 200) {
        setSignInPage(true);
        if (res?.data?.otp) {

          setValue("otp", res?.data?.otp);
        }
        toast.success("OTP sent successfully!");
      }
    } catch (error: any) {
      ErrorHandle(error.response);
    }
  };

  const handleOtpVerify = async () => {
    const values = getValues();
    if (!values.otp) {
      toast.error("Enter OTP");
      return;
    }

    try {
      const res: any = await VerifyOtp({
        data: Number(values.otp),
        phone: Number(values.phone),
      });

      if (res.status === 200) {
        localStorage.setItem("canteen_token", res.data.token);
        localStorage.setItem("canteen_data", JSON.stringify(res.data.canteen));
        dispatch(setLoginCanteenUser(res.data.user));
        dispatch(setLoginCanteenUserToken(res.data.token));
        dispatch(setLoginCanteenData(res.data.canteen));
        navigate("/SelectCanteen");
      }
    } catch (error: any) {
      let msg = error?.response?.data.message || error?.response?.data.error || "Invalid OTP";
      setError("otp", { type: "manual", message: msg });
      //   setSignInPage(false);
      //   setValue("otp", "");
      ErrorHandle(error.response);
    }
  };

  const handleChangePhoneNumber = () => {
    setSignInPage(false);
    setValue("phone", "");
    setValue("otp", "");
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 🔳 Background Image */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(6px)",
          zIndex: 0,
        }}
      />

      {/* 🧊 Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1,
        }}
      />

      {/* 🧩 Foreground UI */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          height: "60%",
          width: "60%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          p: 2
        }}
      >
        <Box sx={{
          width: "50%"
        }}>

          <img
            src={bgimg}
            alt="Your Image"
            style={{ width: "80%", height: "10%", objectFit: "cover" }}
          />

        </Box>

        <Box
          sx={{
            width: "30%",
            p: 4,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 15, 0.37)",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight={600}
            color="#fff"
          >
            Canteen Login
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="Phone Number"
                variant="outlined"
                size="small"
                fullWidth
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                disabled={!!signInPage}
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    color: "white !important", // 🔥 force white label
                    "&.Mui-focused": {
                      color: "white !important", // 🟦→⚪
                    },
                  },
                }}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 1,
                  input: { color: "white" }, // 🔥 white input text
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.4)", // 🔲 default border
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white", // 🖱️ hover
                  },
                  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white", // 🧠 focus
                  },
                }}
              />



              {signInPage && (
                <TextField
                  label="Enter OTP"
                  variant="outlined"
                  size="small"
                  error={!!errors.otp}
                  helperText={errors.otp?.message}
                  fullWidth
                  {...register("otp")}
                  onChange={(e) => setValue("otp", e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      color: "white !important",
                      "&.Mui-focused": {
                        color: "white !important",
                      },
                    },
                  }}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 1,
                    input: { color: "white" },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.4)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                  }}
                />

              )}

              <Stack spacing={2} mt={1}>
                {!signInPage ? (
                  <LoadingButton
                    type="submit"
                    loading={isPending}
                    fullWidth
                    variant="contained"

                    sx={{
                      backgroundColor: "#1976d2",
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Send OTP
                  </LoadingButton>
                ) : (
                  <>
                    <LoadingButton
                      onClick={handleOtpVerify}
                      loading={isPendingVerify}
                      fullWidth
                      variant="contained"
                      sx={{
                        backgroundColor: "#1976d2",
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Verify OTP
                    </LoadingButton>
                    <div style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "white",
                          textAlign: "center",
                          mt: 1,
                          textDecoration: "underline",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          "&:hover": { opacity: 0.8 },
                        }}
                        onClick={() => {
                          const values = getValues();
                          if (values.phone.length === 10) {
                            handleSubmit(onSubmit)();
                          } else {
                            toast.error("Invalid phone number");
                          }
                        }}
                      >
                        Resend OTP
                      </Typography>
                      <Typography variant="body2" sx={{
                        color: colors.grey[600],
                        textAlign: "center",
                        mt: 1,
                        fontSize: "0.875rem",
                        cursor: "pointer",
                        "&:hover": { opacity: 0.8 },
                        textDecoration: "underline",
                        display: "flex",
                        alignItems: "center"
                      }}
                        onClick={() => handleChangePhoneNumber()}
                      >
                        Change Number <Forward fontSize="small" />
                      </Typography>
                    </div>
                  </>
                )}
              </Stack>
            </Stack>
          </form>

          <Typography
            variant="caption"
            textAlign="center"
            color="white"
            mt={2}
          >
            Powered by Magadh • Secure login
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginCanteenPage;
