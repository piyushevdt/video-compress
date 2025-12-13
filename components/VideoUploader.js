"use client";
import { useState, useCallback } from "react";
import { Box, Button, Typography, Card, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import CompressionOptions from "./CompressionOptions";
import ResultCard from "./ResultCard";
import { compressVideo } from "../utils/videoCompression";

export default function VideoUploader() {
  const [video, setVideo] = useState(null);
  const [result, setResult] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = useCallback((file) => {
    setVideo(file);
    setResult(null);
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0] && e.dataTransfer.files[0].type.startsWith('video/')) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleCompress = async (quality) => {
    const output = await compressVideo(video, quality);
    setResult(output);
  };

  return (
    <Card sx={{ 
      p: { xs: 3, sm: 4, md: 6 }, 
      textAlign: "center",
      maxWidth: 800,
      mx: 'auto',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
    }}>
      <Typography variant="h4" fontWeight={700} mb={1} color="primary.main">
        Reduce Video Size
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Upload your video and compress it without losing quality
      </Typography>

      {!video ? (
        <Box
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            border: isDragging ? '3px dashed #6366f1' : '3px dashed #e2e8f0',
            borderRadius: 4,
            p: 6,
            background: isDragging ? 'rgba(99, 102, 241, 0.05)' : '#f8fafc',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            '&:hover': {
              borderColor: '#6366f1',
              background: 'rgba(99, 102, 241, 0.03)',
            }
          }}
          onClick={() => document.getElementById('file-upload').click()}
        >
          <Icon 
            icon="mdi:cloud-upload" 
            width={64} 
            height={64} 
            style={{ color: '#6366f1', marginBottom: 16 }} 
          />
          <Typography variant="h6" fontWeight={600} mb={1}>
            Drag & Drop your video here
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            or click to browse files
          </Typography>
          
          <Button
            variant="contained"
            component="label"
            startIcon={<Icon icon="mdi:folder" />}
            sx={{ mt: 2 }}
          >
            Choose Video File
            <input 
              id="file-upload"
              type="file" 
              hidden 
              accept="video/*" 
              onChange={handleFileChange} 
            />
          </Button>
          
          <Typography variant="caption" color="text.secondary" mt={2} display="block">
            Supports MP4, AVI, MOV, MKV, and more
          </Typography>
        </Box>
      ) : (
        <>
          <Card sx={{ 
            p: 3, 
            mb: 4, 
            background: '#f0f9ff',
            border: '1px solid #bae6fd'
          }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={2}>
                <Icon 
                  icon="mdi:video" 
                  width={32} 
                  height={32} 
                  style={{ color: '#6366f1' }} 
                />
                <Box textAlign="left">
                  <Typography fontWeight={600}>{video.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {(video.size / (1024 * 1024)).toFixed(2)} MB
                  </Typography>
                </Box>
              </Box>
              <IconButton 
                onClick={() => setVideo(null)}
                sx={{ color: '#ef4444' }}
              >
                <Icon icon="mdi:close" />
              </IconButton>
            </Box>
          </Card>

          <Typography variant="h6" fontWeight={600} mb={3}>
            Select Compression Level
          </Typography>
          
          <Box mt={4} mb={4}>
            <CompressionOptions onCompress={handleCompress} />
          </Box>
        </>
      )}

      {result && <ResultCard result={result} />}
    </Card>
  );
}