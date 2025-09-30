"use client";
import { RootState } from "@/app/store/store";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

const Index = () => {
  const theme = useTheme();
  const data = useSelector((state: RootState) => state.auth.user);
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setEmail(data.email || "");
      setCurrentPassword(data.password || "");
    }
  }, [data]);

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) setImage(savedImage);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imgData = reader.result as string;
        setImage(imgData);
        localStorage.setItem("profileImage", imgData);
      };
      reader.readAsDataURL(file);
    }
  };

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: theme.palette.primary.main },
  };

  return (
    <Box sx={{ mt: 3, px: { xs: 2, sm: 3, md: 3 } }}>
      {/* Profile Section */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box
            sx={{
              width: { xs: 120, sm: 150 },
              height: { xs: 120, sm: 150 },
              borderRadius: "50%",
              border: `2px dashed ${theme.palette.divider}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              cursor: "pointer",
              position: "relative", // needed for <Image fill />
              mb: 1,
            }}
            onClick={() => document.getElementById("imageUpload")?.click()}
          >
            {image ? (
              <Image
                src={image}
                alt="Profile"
                fill
                style={{ objectFit: "cover" }}
              />
            ) : (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textAlign: "center", px: 1 }}
              >
                Upload a Profile Picture
              </Typography>
            )}
            <input
              type="file"
              accept="image/*"
              id="imageUpload"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </Box>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ color: theme.palette.text.secondary, fontSize: { xs: 14, sm: 16 } }}
          >
            Personal Info
          </Typography>
        </Box>
      </Box>

      {/* Two Fields in One Row */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={textFieldStyles}
        />
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={textFieldStyles}
        />
      </Box>

      {/* Buttons */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mb: 4 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
            textTransform: "none",
            width: { xs: "100%", sm: "auto" },
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
        >
          Save Changes
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: theme.palette.text.secondary,
            color: theme.palette.text.secondary,
            textTransform: "none",
            "&:hover": { borderColor: theme.palette.text.secondary },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Reset
        </Button>
      </Box>

      {/* Security Section */}
      <Box sx={{ border: `2px solid ${theme.palette.divider}`, borderRadius: 2, p: 3 }}>
        <Typography sx={{ fontSize: { xs: 15, sm: 17 }, mb: 1 }}>Security</Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, fontSize: { xs: 12, sm: 14 } }}
        >
          Update your password to keep your account secure
        </Typography>

        <TextField
          fullWidth
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          sx={{ mb: 2, ...textFieldStyles }}
        />
        <TextField
          fullWidth
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={password.length > 0 && password.length < 8}
          helperText={
            password.length > 0 && password.length < 8
              ? "Password must be at least 8 characters"
              : ""
          }
          sx={{ mb: 2, ...textFieldStyles }}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 3, ...textFieldStyles }}
        />

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              textTransform: "none",
              width: { xs: "100%", sm: "auto" },
              "&:hover": { backgroundColor: theme.palette.primary.dark },
            }}
          >
            Update Password
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: theme.palette.text.secondary,
              color: theme.palette.text.secondary,
              textTransform: "none",
              "&:hover": { borderColor: theme.palette.text.secondary },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
