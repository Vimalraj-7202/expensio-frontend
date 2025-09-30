"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Link,
  Radio,
  CircularProgress,
  Snackbar,
  Alert,
  Fade,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Image from "next/image";
import { useAppDispatch } from "@/app/hooks/redux";
import { loginUser, registerUser } from "@/app/store/auth/auth.thunk";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

const AuthPage = () => {
  const theme = useTheme(); // Get current theme
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("guest");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const showMessage = (message: string, severity: "success" | "error") => {
    setSnack({ open: true, message, severity });
  };

  useEffect(() => {
    if (!auth.isAuthenticated) {
      setEmail("");
      setPassword("");
      setName("");
      setRole("guest");
      setRemember(false);
    }
  }, [auth.isAuthenticated]);

  const handleSubmit = async () => {
    if (
      !email ||
      (!isLogin && !name) ||
      (!isLogin && role !== "guest" && !password)
    ) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const res = await dispatch(loginUser({ email, password })).unwrap();
        setEmail("");
        setPassword("");
        showMessage("Login successful", "success");

        if (res.role === "guest") router.push("/guest");
        else router.push("/dashboard");
      } else {
        const res = await dispatch(
          registerUser({ name, email, password, role })
        ).unwrap();
        showMessage("Registration successful", "success");

        if (role === "guest") router.push("/guest");
        else router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("Auth failed:", err);
      showMessage(
        isLogin ? "Login failed. Try again." : "Registration failed.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    email && (isLogin || (name && (role === "guest" || password)));

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "11px",
      height: "45px",
      backgroundColor:
        theme.palette.mode === "light" ? "#ebf4edff" : "#1e1e1e",
      transition: "all 0.2s ease-in-out",
      "& fieldset": { borderColor: "#e0e0e0" },
      "&:hover fieldset": { borderColor: theme.palette.primary.main },
      "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
    },
  };

  const checkStyle = {
    color: theme.palette.primary.main,
    "&.Mui-checked": { color: theme.palette.primary.main },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "97vh",
      }}
    >
      {/* LEFT SIDE */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: theme.palette.primary.main,
          p: 6,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          color: theme.palette.text.primary,
          height: "100vh",
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            position: "absolute",
            top: 24,
            left: 32,
            display: "flex",
            alignItems: "center",
            gap: "0px",
          }}
        >
          <Box sx={{ width: 45, height: 45, position: "relative" }}>
            <Image
              src="/wallet1.svg"
              alt="Expensio Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Typography variant="h6" fontWeight="bold">
            <span style={{ color: "white" }}>Expensio</span>
          </Typography>
        </Box>

        {/* Text Section */}
        <Box sx={{ maxWidth: 450, zIndex: 2 }}>
          <Typography
            variant="h3"
            fontWeight="bolder"
            gutterBottom
            sx={{ color: "white" }}
          >
            Track expenses with clarity. Empower admins with control.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ color: "rgba(255,255,255,0.85)" }}
          >
            Expensio is a modern expense tracker with a streamlined user
            dashboard and powerful admin controls for categories, budgets, and
            teams.
          </Typography>
          <ul
            style={{
              fontSize: "1.2rem",
              listStyle: "none",
              padding: 0,
              margin: 0,
              color: "white",
            }}
          >
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <TrendingUpIcon sx={{ color: "white" }} />
              Real-time insights
            </li>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <GppGoodOutlinedIcon sx={{ color: "white" }} />
              Role-based access
            </li>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <GroupsOutlinedIcon sx={{ color: "white" }} />
              Team Ready
            </li>
          </ul>
        </Box>
      </Box>

      {/* RIGHT SIDE */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 6,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Fade in timeout={500}>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            sx={{
              width: "100%",
              maxWidth: 450,
              p: 4,
              borderRadius: "16px",
              backgroundColor: theme.palette.background.paper,
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", textAlign: "center", color: theme.palette.text.primary }}
            >
              {isLogin ? "Welcome back" : "Create your account"}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              mb={3}
              sx={{ textAlign: "center" }}
            >
              {isLogin
                ? "Sign in to your Expensio"
                : "Sign up to get started with Expensio"}
            </Typography>

            {!isLogin && (
              <TextField
                fullWidth
                placeholder="Full Name"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={textFieldStyle}
              />
            )}

            <TextField
              fullWidth
              placeholder="you@gmail.com"
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={textFieldStyle}
            />

            {(isLogin || (!isLogin && role !== "guest")) && (
              <TextField
                fullWidth
                placeholder="Password"
                margin="normal"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyle}
              />
            )}

            {isLogin && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      sx={checkStyle}
                    />
                  }
                  label="Remember me"
                />
                <Link
                  href="#"
                  underline="hover"
                  sx={{ fontSize: "0.9rem", color: theme.palette.primary.main }}
                >
                  Forgot?
                </Link>
              </Box>
            )}

            {!isLogin && (
              <Box mt={2}>
                <Typography
                  variant="body2"
                  fontWeight="medium"
                  gutterBottom
                  sx={{ color: theme.palette.text.primary }}
                >
                  Select Role
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  {["admin", "user", "guest"].map((r) => (
                    <FormControlLabel
                      key={r}
                      value={r}
                      control={
                        <Radio
                          checked={role === r}
                          onChange={(e) => setRole(e.target.value)}
                          sx={checkStyle}
                        />
                      }
                      label={r.charAt(0).toUpperCase() + r.slice(1)}
                    />
                  ))}
                </Box>
              </Box>
            )}

            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                py: 1.2,
                color: theme.palette.text.primary,
                fontWeight: 600,
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: "12px",
                bgcolor: theme.palette.primary.main,
                "&:hover": { bgcolor: theme.palette.primary.dark },
              }}
              disabled={loading || !isFormValid}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : isLogin ? (
                "Sign in"
              ) : (
                "Sign up"
              )}
            </Button>

            <Typography
              variant="body2"
              textAlign="center"
              mt={3}
              sx={{ color: theme.palette.text.secondary }}
            >
              {isLogin ? "New to Expensio?" : "Already have an account?"}{" "}
              <Button
                variant="text"
                onClick={() => setIsLogin(!isLogin)}
                sx={{ textTransform: "none", color: theme.palette.primary.main }}
              >
                {isLogin ? "Create an account" : "Sign in"}
              </Button>
            </Typography>
          </Box>
        </Fade>
      </Box>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnack({ ...snack, open: false })}
          severity={snack.severity}
          sx={{ width: "100%", borderRadius: "8px" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AuthPage;
