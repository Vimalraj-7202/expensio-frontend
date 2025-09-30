"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CommonTitle from "@/app/common/CommonTitle";
import { useTheme } from "@mui/material/styles";

const Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);

  const theme = useTheme();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
      setPreviewUrl(URL.createObjectURL(uploadedFile));
      setProgress(0);
      simulateUpload();
    } else {
      alert("Only PDF files are allowed!");
    }
  };

  // fake upload simulation with progress
  const simulateUpload = () => {
    setIsUploading(true);
    let percent = 0;
    const interval = setInterval(() => {
      percent += 10;
      setProgress(percent);
      if (percent >= 100) {
        clearInterval(interval);
        setIsUploading(false);
      }
    }, 300);
  };

  return (
    <Box>
      {/* Title */}
      <CommonTitle
        title="Receipts"
        subTitle="Upload and keep receipts alongside expenses."
      />

      {/* Two sections side by side */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: { xs: "wrap", md: "nowrap" },
          alignItems: "stretch",
          mt: 2,
        }}
      >
        {/* Upload Section */}
        <Box
          sx={{
            border: `2px dashed ${theme.palette.divider}`,
            borderRadius: "10px",
            height: "250px",
            flex: "1 1 40%",
            maxWidth: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          <BackupOutlinedIcon
            sx={{ color: theme.palette.primary.main, fontSize: 50, mb: 1 }}
          />
          <Typography
            sx={{ fontSize: "16px", fontWeight: 500, color: theme.palette.text.primary }}
          >
            Drag and drop your receipts here
          </Typography>
          <Typography
            sx={{ fontSize: "14px", color: theme.palette.text.secondary, mb: 2 }}
          >
            PDF only
          </Typography>

          {/* Hidden input for file upload */}
          <input
            type="file"
            accept="application/pdf"
            id="upload-receipt"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="upload-receipt">
            <Button
              component="span"
              sx={{
                height: "40px",
                width: "130px",
                textTransform: "none",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                borderRadius: "7px",
                "&:hover": { backgroundColor: theme.palette.primary.dark },
              }}
            >
              Browse Files
            </Button>
          </label>

          <Typography
            sx={{ fontSize: "14px", color: theme.palette.text.secondary, mt: 1 }}
          >
            or drop your files
          </Typography>
        </Box>

        {/* Summary Section */}
        <Box
          sx={{
            height: "250px",
            flex: "1 1 60%",
            maxWidth: "700px",
            border: `2px solid ${theme.palette.divider}`, // ✅ adaptive
            borderRadius: "10px",
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: theme.palette.background.paper, // ✅ adaptive
          }}
        >
          <Box>
            <Typography
              sx={{ fontSize: "20px", mb: 1, color: theme.palette.text.primary }}
            >
              Summary
            </Typography>
            <Typography sx={{ color: theme.palette.text.primary }}>
              Total Files: {file ? 1 : 0}
            </Typography>
            <Typography sx={{ color: theme.palette.text.primary }}>
              Uploaded: {progress === 100 ? 1 : 0}
            </Typography>
            <Typography
              sx={{ color: theme.palette.text.secondary, mt: 1 }}
            >
              Accepted type: Pdf Only
            </Typography>
          </Box>

          {file && (
            <Box sx={{ mt: 2 }}>
              <Typography
                sx={{ fontSize: "14px", fontWeight: 500, color: theme.palette.text.primary }}
              >
                File: {file.name}
              </Typography>
              {isUploading ? (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={progress}
                    size={24}
                    thickness={5}
                    sx={{ color: theme.palette.primary.main }}
                  />
                  <Typography sx={{ fontSize: "14px", color: theme.palette.text.primary }}>
                    {progress}%
                  </Typography>
                </Box>
              ) : (
                progress === 100 && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mt: 1,
                    }}
                  >
                    <Typography sx={{ color: theme.palette.primary.main }}>
                      Upload complete
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "rgba(20,171,120,0.2)"
                              : "#e6f7f2",
                        },
                      }}
                      onClick={() => setOpenPreview(true)}
                    >
                      Preview
                    </Button>
                  </Box>
                )
              )}
            </Box>
          )}
        </Box>
      </Box>

      {/* Fullscreen Preview Dialog */}
      <Dialog
        fullScreen
        open={openPreview}
        onClose={() => setOpenPreview(false)}
      >
        <AppBar sx={{ position: "relative", background: theme.palette.primary.main }}>
          <Toolbar>
            <Typography sx={{ flex: 1 }} variant="h6" component="div">
              {file?.name}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setOpenPreview(false)}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ flex: 1, height: "100%", backgroundColor: theme.palette.background.default }}>
          {previewUrl && (
            <iframe
              src={previewUrl}
              width="100%"
              height="100%"
              style={{ border: "none" }}
            ></iframe>
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default Page;
