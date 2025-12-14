"use client";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Chip,
  Tooltip,
  Stack,
  LinearProgress,
  Avatar,
  alpha
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

export default function VideoPreview({ video, onRemove }) {
  const [videoDuration, setVideoDuration] = useState(null);
  const [dimensions, setDimensions] = useState({ width: null, height: null });
  const fileSizeMB = (video.size / (1024 * 1024)).toFixed(2);

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    const iconMap = {
      mp4: 'mdi:file-video',
      avi: 'mdi:file-video',
      mov: 'mdi:file-video',
      wmv: 'mdi:file-video',
      mkv: 'mdi:file-video',
      webm: 'mdi:file-video',
      flv: 'mdi:file-video',
      m4v: 'mdi:file-video'
    };
    return iconMap[ext] || 'mdi:file';
  };

  const getFileTypeColor = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    const colorMap = {
      mp4: '#3b82f6',
      avi: '#ef4444',
      mov: '#10b981',
      wmv: '#f59e0b',
      mkv: '#8b5cf6',
      webm: '#ec4899',
      flv: '#6366f1',
      m4v: '#06b6d4'
    };
    return colorMap[ext] || '#6b7280';
  };

  const formatDuration = (seconds) => {
    if (!seconds) return null;
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Extract video metadata
  useEffect(() => {
    const videoUrl = URL.createObjectURL(video);
    const videoElement = document.createElement('video');
    
    videoElement.src = videoUrl;
    videoElement.addEventListener('loadedmetadata', () => {
      setVideoDuration(videoElement.duration);
      setDimensions({
        width: videoElement.videoWidth,
        height: videoElement.videoHeight
      });
      URL.revokeObjectURL(videoUrl);
    });

    return () => {
      URL.revokeObjectURL(videoUrl);
    };
  }, [video]);

  const handleRemove = () => {
    if (onRemove && typeof onRemove === 'function') {
      onRemove();
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 3,
        background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
        border: '2px solid',
        borderColor: 'primary.light',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '4px',
          background: 'linear-gradient(to bottom, #4f46e5, #7c3aed)',
        }
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        {/* File Icon */}
        <Avatar
          sx={{
            bgcolor: getFileTypeColor(video.name),
            width: 60,
            height: 60,
            borderRadius: 2,
            boxShadow: 2
          }}
        >
          <Icon 
            icon={getFileIcon(video.name)} 
            style={{ fontSize: '2rem', color: 'white' }} 
          />
        </Avatar>

        {/* File Info */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack spacing={1}>
            <Typography
              variant="h6"
              component="p"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {video.name}
            </Typography>

            {/* File Details */}
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Chip
                icon={<Icon icon="mdi:weight" />}
                label={`${fileSizeMB} MB`}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  fontWeight: 500
                }}
              />

              {videoDuration && (
                <Chip
                  icon={<Icon icon="mdi:clock-outline" />}
                  label={formatDuration(videoDuration)}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: 'success.main',
                    color: 'success.main',
                    fontWeight: 500
                  }}
                />
              )}

              {dimensions.width && dimensions.height && (
                <Chip
                  icon={<Icon icon="mdi:aspect-ratio" />}
                  label={`${dimensions.width}×${dimensions.height}`}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: 'warning.main',
                    color: 'warning.main',
                    fontWeight: 500
                  }}
                />
              )}

              <Chip
                icon={<Icon icon={getFileIcon(video.name)} />}
                label={video.name.split('.').pop().toUpperCase()}
                size="small"
                sx={{
                  bgcolor: alpha(getFileTypeColor(video.name), 0.1),
                  color: getFileTypeColor(video.name),
                  fontWeight: 600
                }}
              />
            </Stack>

            {/* Size Progress Bar */}
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                File size: {fileSizeMB} MB
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Math.min((fileSizeMB / 100) * 100, 100)}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                    borderRadius: 3,
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                {fileSizeMB < 10 ? 'Small file' : fileSizeMB < 50 ? 'Medium file' : 'Large file'} - Compression recommended
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Remove Button */}
        <Tooltip title="Remove video" arrow>
          <IconButton
            onClick={handleRemove}
            sx={{
              bgcolor: 'error.light',
              color: 'error.contrastText',
              width: 48,
              height: 48,
              '&:hover': {
                bgcolor: 'error.main',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s ease',
              alignSelf: { xs: 'flex-end', sm: 'center' }
            }}
          >
            <Icon icon="mdi:close" style={{ fontSize: '1.5rem' }} />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* Additional Info */}
      <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Icon icon="mdi:information" fontSize="0.875rem" />
            Ready for compression
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Icon icon="mdi:calendar-clock" fontSize="0.875rem" />
            Uploaded just now
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}