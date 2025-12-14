"use client";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  LinearProgress,
  Divider,
  Fade,
  Paper,
  Grid,
  IconButton,
  Tooltip
} from '@mui/material';
import { Icon } from '@iconify/react';
import { keyframes } from '@emotion/react';

// Animation for success celebration
const confettiAnimation = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.8;
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

export default function ResultCard({ result, onReset }) {
  const savedPercentage = Math.round((1 - result.compressedSize / result.originalSize) * 100);
  const savedMB = (result.originalSize - result.compressedSize).toFixed(2);

  const getCompressionLevel = (percentage) => {
    if (percentage >= 70) return 'Excellent';
    if (percentage >= 50) return 'Great';
    if (percentage >= 30) return 'Good';
    return 'Moderate';
  };

  const compressionLevel = getCompressionLevel(savedPercentage);

  return (
    <Fade in timeout={800}>
      <Card
        sx={{
          background: 'linear-gradient(135deg, #d1fae5 0%, #e0f2fe 100%)',
          border: '2px solid',
          borderColor: 'success.light',
          borderRadius: 4,
          overflow: 'visible',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -10,
            left: -10,
            right: -10,
            bottom: -10,
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
            borderRadius: 8,
            zIndex: -1,
          }
        }}
        elevation={8}
      >
        {/* Celebration Icons */}
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            right: 20,
            animation: `${confettiAnimation} 2s ease-in-out infinite`,
          }}
        >
          <Icon icon="mdi:party-popper" style={{ fontSize: '2rem', color: '#ec4899' }} />
        </Box>
        
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            left: 20,
            animation: `${confettiAnimation} 2s ease-in-out infinite 0.5s`,
          }}
        >
          <Icon icon="mdi:confetti" style={{ fontSize: '1.5rem', color: '#f59e0b' }} />
        </Box>

        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4, position: 'relative' }}>
            <Box
              sx={{
                animation: `${floatAnimation} 3s ease-in-out infinite`,
                mb: 2
              }}
            >
              <Icon 
                icon="mdi:check-circle" 
                style={{ 
                  fontSize: '4rem', 
                  color: '#10b981',
                  filter: 'drop-shadow(0 4px 6px rgba(16, 185, 129, 0.3))'
                }} 
              />
            </Box>
            
            <Typography
              variant="h4"
              component="h3"
              sx={{
                fontWeight: 800,
                color: 'success.dark',
                mb: 1,
                background: 'linear-gradient(90deg, #059669, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.5
              }}
            >
              <Icon icon="mdi:trophy" />
              Compression Complete!
            </Typography>

            <Chip
              label={`${compressionLevel} Compression`}
              color={savedPercentage >= 70 ? 'success' : savedPercentage >= 50 ? 'primary' : 'warning'}
              sx={{ 
                fontWeight: 600,
                fontSize: '0.875rem',
                py: 1
              }}
            />
          </Box>

          {/* Space Saved Progress */}
          <Paper
            elevation={2}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              bgcolor: 'white',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Icon icon="mdi:chart-pie" color="#6366f1" />
                  Space Saved
                </Typography>
                <Chip
                  label={`${savedPercentage}% Saved`}
                  color="success"
                  variant="filled"
                  sx={{ fontWeight: 700, fontSize: '0.875rem' }}
                />
              </Box>

              <LinearProgress
                variant="determinate"
                value={savedPercentage}
                sx={{
                  height: 16,
                  borderRadius: 8,
                  bgcolor: 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #10b981, #3b82f6)',
                    borderRadius: 8,
                  }
                }}
              />

              <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                Your video is now {savedPercentage}% smaller!
              </Typography>
            </Stack>
          </Paper>

          {/* File Details */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: 'white',
                  border: '2px solid',
                  borderColor: 'grey.300',
                  height: '100%'
                }}
              >
                <Stack spacing={1} alignItems="center" textAlign="center">
                  <Icon icon="mdi:file-video" style={{ fontSize: '2rem', color: '#6b7280' }} />
                  <Typography variant="body2" color="text.secondary">
                    Original Size
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    {result.originalSize} MB
                  </Typography>
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: 'white',
                  border: '2px solid',
                  borderColor: 'primary.light',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                  }
                }}
              >
                <Stack spacing={1} alignItems="center" textAlign="center">
                  <Icon icon="mdi:file-compressed" style={{ fontSize: '2rem', color: '#6366f1' }} />
                  <Typography variant="body2" color="text.secondary">
                    Compressed Size
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {result.compressedSize} MB
                  </Typography>
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: 'white',
                  border: '2px solid',
                  borderColor: 'success.light',
                  height: '100%'
                }}
              >
                <Stack spacing={1} alignItems="center" textAlign="center">
                  <Icon icon="mdi:database-arrow-down" style={{ fontSize: '2rem', color: '#10b981' }} />
                  <Typography variant="body2" color="text.secondary">
                    Space Saved
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.dark' }}>
                    {savedMB} MB
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }}>
            <Chip label="Quick Actions" size="small" />
          </Divider>

          {/* Action Buttons */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<Icon icon="mdi:download" />}
              href={result.url}
              download={result.filename}
              sx={{
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #4338ca, #6d28d9)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 25px rgba(79, 70, 229, 0.3)'
                },
                transition: 'all 0.3s ease',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              Download Video
            </Button>

            <Button
              variant="outlined"
              size="large"
              fullWidth
              startIcon={<Icon icon="mdi:refresh" />}
              onClick={onReset}
              sx={{
                py: 1.5,
                borderRadius: 2,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'primary.50',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              Compress Another
            </Button>
          </Stack>

          {/* Additional Actions */}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
            <Tooltip title="Copy download link">
              <IconButton
                onClick={() => navigator.clipboard.writeText(result.url)}
                sx={{
                  bgcolor: 'grey.100',
                  '&:hover': { bgcolor: 'grey.200' }
                }}
              >
                <Icon icon="mdi:link" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Share result">
              <IconButton
                onClick={() => alert('Share feature coming soon!')}
                sx={{
                  bgcolor: 'grey.100',
                  '&:hover': { bgcolor: 'grey.200' }
                }}
              >
                <Icon icon="mdi:share-variant" />
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
}