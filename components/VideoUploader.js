"use client";
import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Fade,
  Stack,
  Chip,
  alpha,
  keyframes,
  useTheme
} from '@mui/material';
import { Icon } from '@iconify/react';

// Animation for upload icon
const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pulseAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

export default function VideoUploadZone({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const theme = useTheme();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    document.getElementById('file-upload').click();
  };

  const supportedFormats = ['MP4', 'AVI', 'MOV', 'MKV', 'WMV', 'WebM', 'FLV', 'M4V'];

  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
      sx={{
        width: '100%',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          '& .upload-icon': {
            animation: `${floatAnimation} 2s ease-in-out infinite`,
          },
          '& .upload-button': {
            transform: 'translateY(-2px)',
            boxShadow: 8,
          }
        }
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(${alpha(theme.palette.primary.main, 0.05)} 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          opacity: isDragging ? 0.8 : 0.5,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Main Upload Area */}
      <Paper
        elevation={isDragging ? 8 : 4}
        sx={{
          p: { xs: 4, md: 6 },
          textAlign: 'center',
          position: 'relative',
          border: `3px dashed`,
          borderColor: isDragging ? 'primary.main' : isHovering ? 'primary.light' : 'grey.300',
          backgroundColor: isDragging 
            ? alpha(theme.palette.primary.main, 0.08)
            : isHovering
            ? alpha(theme.palette.primary.main, 0.04)
            : alpha(theme.palette.grey[50], 0.8),
          borderRadius: 4,
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          minHeight: 400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Upload Icon */}
        <Fade in timeout={500}>
          <Box
            className="upload-icon"
            sx={{
              mb: 4,
              position: 'relative',
              animation: isDragging ? `${pulseAnimation} 1s ease-in-out infinite` : 'none',
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <Icon 
                icon={isDragging ? "mdi:cloud-upload" : "mdi:video-plus"} 
                style={{ 
                  fontSize: '3.5rem', 
                  color: theme.palette.primary.main,
                  filter: `drop-shadow(0 4px 8px ${alpha(theme.palette.primary.main, 0.3)})`
                }} 
              />
              
              {/* Animated Rings */}
              {isDragging && (
                <>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -10,
                      left: -10,
                      right: -10,
                      bottom: -10,
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                      borderRadius: '50%',
                      animation: `${pulseAnimation} 1.5s ease-in-out infinite`,
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      left: -20,
                      right: -20,
                      bottom: -20,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      borderRadius: '50%',
                      animation: `${pulseAnimation} 2s ease-in-out infinite`,
                    }}
                  />
                </>
              )}
            </Box>
          </Box>
        </Fade>

        {/* Title */}
        <Typography
          variant="h4"
          component="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: 'text.primary',
            background: isDragging 
              ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
              : 'none',
            WebkitBackgroundClip: isDragging ? 'text' : 'none',
            WebkitTextFillColor: isDragging ? 'transparent' : 'inherit',
          }}
        >
          {isDragging ? 'Drop your video here!' : 'Upload Your Video'}
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: 'text.secondary',
            maxWidth: 500,
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          {isDragging 
            ? 'Release to upload your video file'
            : 'Drag & drop your video file here, or click to browse your computer'
          }
        </Typography>

        {/* Upload Button */}
        <Fade in timeout={700}>
          <Button
            className="upload-button"
            variant="contained"
            size="large"
            startIcon={<Icon icon="mdi:folder-open" />}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 3,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              transition: 'all 0.3s ease',
              mb: 4,
              '&:hover': {
                background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.dark})`,
              }
            }}
          >
            Choose Video File
          </Button>
        </Fade>

        {/* Supported Formats */}
        <Fade in timeout={900}>
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <Icon icon="mdi:format-list-bulleted" fontSize="0.875rem" />
              Supported Formats
            </Typography>
            <Stack 
              direction="row" 
              spacing={1} 
              justifyContent="center" 
              flexWrap="wrap" 
              useFlexGap
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              {supportedFormats.map((format) => (
                <Chip
                  key={format}
                  label={format}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    color: 'text.secondary',
                    fontWeight: 500,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                    }
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Fade>

        {/* Max Size Info */}
        <Fade in timeout={1100}>
          <Typography
            variant="caption"
            sx={{
              mt: 4,
              color: 'text.secondary',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <Icon icon="mdi:information" fontSize="0.75rem" />
            Maximum file size: 2GB • Optimal for videos under 10 minutes
          </Typography>
        </Fade>

        {/* Hidden File Input */}
        <input
          id="file-upload"
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </Paper>

      {/* Drag Indicator */}
      {isDragging && (
        <Fade in>
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              bgcolor: 'primary.main',
              color: 'white',
              px: 2,
              py: 0.5,
              borderRadius: 2,
              fontSize: '0.75rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              animation: `${pulseAnimation} 1s ease-in-out infinite`,
            }}
          >
            <Icon icon="mdi:upload" fontSize="0.875rem" />
            Upload Ready
          </Box>
        </Fade>
      )}
    </Box>
  );
}