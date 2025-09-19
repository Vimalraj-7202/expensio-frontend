"use client";
import { useState } from "react";
import {Box,Typography,TextField,Button,InputAdornment,IconButton,Checkbox,FormControlLabel,Link,Radio,CircularProgress,Snackbar,Alert,Fade} from "@mui/material";
import { useRouter } from "next/navigation";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Image from "next/image";

const AuthPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("guest"); // default guest
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({open: false,message: "",severity: "success" as "success" | "error"});

  const showMessage = (message: string, severity: "success" | "error") => {
    setSnack({ open: true, message, severity });
  };

  const handleSubmit = async () => {
    // validation
    if (!email || (!isLogin && !name)) {
      showMessage("Please fill in all required fields.", "error");
      return;
    }

    if (isLogin && !password) {
      showMessage("Password is required.", "error");
      return;
    }

    // skip password requirement if role === guest
    if (!isLogin && role !== "guest" && !password) {
      showMessage("Password is required for Admin/User.", "error");
      return;
    }

    // Guest signup
    if (!isLogin && role === "guest") {
      const guestData = { name, email, role };
      localStorage.setItem("guestUser", JSON.stringify(guestData));
      showMessage("Continuing as Guest", "success");
      router.push("/guest");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        // login
        showMessage("Login successful", "success");
        router.push("/dashboard");
      } else {
        // register
        showMessage("Registration successful", "success");
        router.push("/dashboard");
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

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "11px",
      height: "45px",
      backgroundColor: "#ebf4edff",
      transition: "all 0.2s ease-in-out",
      "& fieldset": { borderColor: "#e0e0e0" },
      "&:hover fieldset": { borderColor: "#14ab78" },
      "&.Mui-focused fieldset": { borderColor: "#14ab78" },
    },
  };

  const checkStyle = {
    color: "#14ab78",
    "&.Mui-checked": { color: "#14ab78" },
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
          background: "linear-gradient(135deg, #95e9b5 0%, #f8f6f5 100%)",
          p: 6,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          borderRadius: "12px",
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
              src="/wallet.svg"
              alt="Expensio Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Typography variant="h6" fontWeight="bold">
            <span style={{ color: "black" }}>Expensio</span>
          </Typography>
        </Box>

        {/* Text Section */}
        <Box sx={{ maxWidth: 450, zIndex: 2 }}>
          <Typography variant="h3" fontWeight="bolder" gutterBottom>
            Track expenses with clarity. Empower admins with control.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
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
            }}
          >
            <li
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <TrendingUpIcon sx={{ color: "#14ab78" }} />
              Real-time insights
            </li>
            <li
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <GppGoodOutlinedIcon sx={{ color: "#14ab78" }} />
              Role-based access
            </li>
            <li
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <GroupsOutlinedIcon sx={{ color: "#14ab78" }} />
              Team Ready
            </li>
          </ul>
        </Box>

        {/* SVG Image */}
        <Box
          sx={{
            position: "absolute",
            bottom: 100,
            right: 30,
            width: "500px",
            height: "500px",
            opacity: 0.9,
          }}
        >
          <Image
            src="/bg.svg"
            alt="Teamwork illustration"
            width={600}
            height={600}
            style={{ objectFit: "contain" }}
          />
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
          backgroundColor: "#fefefeff",
        }}
      >
        <Fade in timeout={500}>
          <Box
            component="form"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            sx={{
              width: "100%",
              maxWidth: 450,
              p: 4,
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", textAlign: "center" }}
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
              autoComplete="off"
              sx={textFieldStyle}
            />

            {/* Password field without Chrome popup */}
            {(isLogin || role !== "guest") && (
              <TextField
                fullWidth
                placeholder="Password"
                margin="normal"
                type="text"
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
                autoComplete="new-password"
                inputProps={{
                  autoComplete: "off",
                  form: { autoComplete: "off" },
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
                  sx={{ fontSize: "0.9rem", color: "#14ab78" }}
                >
                  Forgot?
                </Link>
              </Box>
            )}

            {!isLogin && (
              <Box mt={2}>
                <Typography variant="body2" fontWeight="medium" gutterBottom>
                  Select Role
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <FormControlLabel
                    value="admin"
                    control={
                      <Radio
                        checked={role === "admin"}
                        onChange={(e) => setRole(e.target.value)}
                        sx={checkStyle}
                      />
                    }
                    label="Admin"
                  />
                  <FormControlLabel
                    value="user"
                    control={
                      <Radio
                        checked={role === "user"}
                        onChange={(e) => setRole(e.target.value)}
                        sx={checkStyle}
                      />
                    }
                    label="User"
                  />
                  <FormControlLabel
                    value="guest"
                    control={
                      <Radio
                        checked={role === "guest"}
                        onChange={(e) => setRole(e.target.value)}
                        sx={checkStyle}
                      />
                    }
                    label="Guest"
                  />
                </Box>
              </Box>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                cursor: "pointer",
                py: 1.2,
                color: "#ffff",
                fontWeight: 600,
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: "12px",
                bgcolor: "#14ab78",
                "&:hover": { bgcolor: "#14ab78" },
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : isLogin ? (
                "Sign in"
              ) : (
                "Sign up"
              )}
            </Button>

            <Typography variant="body2" textAlign="center" mt={3}>
              {isLogin ? "New to Expensio?" : "Already have an account?"}{" "}
              <Button
                variant="text"
                onClick={() => setIsLogin(!isLogin)}
                sx={{ textTransform: "none", color: "#14ab78" }}
              >
                {isLogin ? "Create an account" : "Sign in"}
              </Button>
            </Typography>
          </Box>
        </Fade>
      </Box>

      {/* Snackbar Feedback */}
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
