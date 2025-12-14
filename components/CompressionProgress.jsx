"use client";
import {
  Box,
  Typography,
  LinearProgress,
  Fade,
  Paper,
  Stack,
  Zoom
} from '@mui/material';
import { Icon } from '@iconify/react';
import { keyframes } from '@emotion/react';

// Create custom animations
const pulseAnimation = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
`;

const progressAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export default function CompressionProgress({ progress }) {
  const progressRounded = Math.round(progress);
  const estimatedTime = progress > 0 
    ? Math.max(1, Math.round((100 - progress) / 10)) 
    : 5;

  const getStatusMessage = (currentProgress) => {
    if (currentProgress < 30) return "Initializing compression...";
    if (currentProgress < 60) return "Processing video frames...";
    if (currentProgress < 90) return "Optimizing file size...";
    return "Finalizing compressed video...";
  };

  return (
    <Fade in timeout={500}>
      <Box sx={{ textAlign: 'center', py: 6, px: 2 }}>
        {/* Animated Icon Container */}
        <Zoom in style={{ transitionDelay: '100ms' }}>
          <Box
            sx={{
              position: 'relative',
              width: 96,
              height: 96,
              mx: 'auto',
              mb: 4,
              animation: `${pulseAnimation} 2s ease-in-out infinite`,
            }}
          >
            {/* Outer Ring */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                border: '3px solid',
                borderColor: 'primary.light',
                borderRadius: '50%',
                animation: 'rotate 20s linear infinite',
                '@keyframes rotate': {
                  from: { transform: 'rotate(0deg)' },
                  to: { transform: 'rotate(360deg)' },
                },
              }}
            />

            {/* Main Icon */}
            <Icon
              icon="mdi:video-compress"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '3rem',
                color: 'primary.main',
              }}
            />

            {/* Progress Indicator */}
            <Box
              sx={{
                position: 'absolute',
                bottom: -8,
                right: -8,
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: '50%',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                border: '3px solid white',
                boxShadow: 2,
              }}
            >
              {progressRounded}%
            </Box>
          </Box>
        </Zoom>

        {/* Main Title */}
        <Typography
          variant="h5"
          component="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: 'text.primary',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
          }}
        >
          <Icon icon="mdi:cogs" />
          Compressing Video...
        </Typography>

        {/* Status Message */}
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: 'text.secondary',
            fontWeight: 500,
            minHeight: 28,
          }}
        >
          {getStatusMessage(progress)}
        </Typography>

        {/* Progress Container */}
        <Paper
          elevation={2}
          sx={{
            maxWidth: 480,
            mx: 'auto',
            p: 4,
            borderRadius: 3,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Stack spacing={3}>
            {/* Progress Bar with Gradient */}
            <Box sx={{ position: 'relative' }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  bgcolor: 'grey.100',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #4f46e5, #7c3aed, #a855f7)',
                    backgroundSize: '300% 100%',
                    animation: `${progressAnimation} 2s ease infinite`,
                    borderRadius: 6,
                  },
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 1,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  0%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  100%
                </Typography>
              </Box>
            </Box>

            {/* Progress Details */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Icon icon="mdi:progress-clock" color="#6366f1" />
                <Typography variant="body2" color="text.secondary">
                  Progress: <strong>{progressRounded}%</strong>
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Icon icon="mdi:timer-sand" color="#ec4899" />
                <Typography variant="body2" color="text.secondary">
                  Est. time: <strong>{estimatedTime}s</strong>
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Paper>

        {/* Help Text */}
        <Fade in timeout={800}>
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="caption"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                color: 'text.secondary',
                maxWidth: 400,
                mx: 'auto',
              }}
            >
              <Icon icon="mdi:information" fontSize="0.875rem" />
              This process may take a moment depending on your video size and quality settings
            </Typography>
          </Box>
        </Fade>

        {/* Additional Animation for waiting */}
        {progress > 95 && (
          <Fade in timeout={300}>
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  color: 'success.main',
                  animation: `${pulseAnimation} 1.5s infinite`,
                }}
              >
                <Icon icon="mdi:check-circle" />
                Almost done! Finalizing your compressed video...
              </Typography>
            </Box>
          </Fade>
        )}
      </Box>
    </Fade>
  );
}