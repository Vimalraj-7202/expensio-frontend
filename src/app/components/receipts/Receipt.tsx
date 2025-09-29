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

const Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);

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
      <CommonTitle title="Receipts" subTitle="Upload and keep receipts alongside expenses."/>
      {/* Two sections side by side */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: { xs: "wrap", md: "nowrap" },
          alignItems: "stretch",
        }}
      >
        {/* Upload Section */}
        <Box
          sx={{
            border: "2px dashed #e2e8f0",
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
            // "&:hover": { borderColor: "#14ab78", backgroundColor: "#c5c8c6ff" },
          }}
        >
          <BackupOutlinedIcon sx={{ color: "#14ab78", fontSize: 50, mb: 1 }} />
          <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
            Drag and drop your receipts here
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "gray", mb: 2 }}>
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
                color: "white",
                textTransform: "none",
                backgroundColor: "#14ab78",
                borderRadius: "7px",
                "&:hover": { backgroundColor: "#129a6a" },
              }}
            >
              Browse Files
            </Button>
          </label>

          <Typography sx={{ fontSize: "14px", color: "gray", mt: 1 }}>
            or drop your files
          </Typography>
        </Box>

        {/* Summary Section */}
        <Box
          sx={{
            height: "250px",
            flex: "1 1 60%",
            maxWidth: "700px",
            border: "2px solid #e2e8f0",
            borderRadius: "10px",
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "20px", mb: 1 }}>Summary</Typography>
            <Typography>Total Files: {file ? 1 : 0}</Typography>
            <Typography>Uploaded: {progress === 100 ? 1 : 0}</Typography>
            <Typography sx={{ color: "gray", mt: 1 }}>
              Accepted type: Pdf Only
            </Typography>
          </Box>

          {file && (
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
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
                    sx={{ color: "#14ab78" }}
                  />
                  <Typography sx={{ fontSize: "14px" }}>{progress}%</Typography>
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
                    <Typography sx={{ color: "#14ab78" }}>
                      Upload complete
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: "#14ab78",
                        color: "#14ab78",
                        textTransform: "none",
                        "&:hover": { backgroundColor: "#e6f7f2" },
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
        <AppBar sx={{ position: "relative", background: "#14ab78" }}>
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
        <Box sx={{ flex: 1, height: "100%" }}>
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
