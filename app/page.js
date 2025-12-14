"use client";
import { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  CircularProgress,
  LinearProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import { Icon } from '@iconify/react';
import VideoUploadZone from '../components/VideoUploader';
import VideoPreview from '../components/VideoPreview';
import CompressionOptions from '../components/CompressionOptions';
import CompressionProgress from '../components/CompressionProgress';
import ResultCard from '../components/ResultCard';
import { compressVideo } from '../utils/videoCompression';

export default function Home() {
  const [video, setVideo] = useState(null);
  const [result, setResult] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = useCallback((file) => {
    if (file && file.type.startsWith('video/')) {
      setVideo(file);
      setResult(null);
    }
  }, []);

  const handleCompress = async (quality) => {
    setIsCompressing(true);
    setProgress(0);
    
    const output = await compressVideo(video, quality, setProgress);
    
    setResult(output);
    setIsCompressing(false);
  };

  const handleReset = () => {
    setVideo(null);
    setResult(null);
    setProgress(0);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #ffffff 50%, #f5f3ff 100%)',
        py: 6,
        px: 2
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3rem' }
            }}
          >
            <Icon icon="material-symbols:video-camera-back" 
              style={{ marginRight: '12px', verticalAlign: 'middle' }} 
            />
            Video Compressor
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Compress your videos efficiently with adjustable quality settings
          </Typography>
        </Box>

        {/* Main Card */}
        <Paper
          elevation={8}
          sx={{
            borderRadius: 4,
            p: { xs: 3, md: 5 },
            background: 'white',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)'
            }
          }}
        >
          {!video ? (
            <VideoUploadZone onUpload={handleUpload} />
          ) : (
            <>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Icon icon="mdi:video" />
                    Video Preview
                  </Typography>
                  <Tooltip title="Remove video">
                    <IconButton
                      onClick={handleReset}
                      color="error"
                      size="small"
                    >
                      <Icon icon="mdi:close-circle" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <VideoPreview video={video} onRemove={handleReset}/>
              </Box>

              {!result && !isCompressing && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Icon icon="mdi:compress" />
                    Compression Options
                  </Typography>
                  <CompressionOptions onCompress={handleCompress} />
                </Box>
              )}

              {isCompressing && (
                <Card
                  sx={{
                    mb: 4,
                    border: '1px solid',
                    borderColor: 'primary.light',
                    bgcolor: 'primary.50'
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <CircularProgress
                        variant="determinate"
                        value={progress}
                        size={40}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          Compressing Video...
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {progress}% complete
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Icon icon="mdi:information" />
                      Please wait while we compress your video. This may take a moment.
                    </Typography>
                  </CardContent>
                </Card>
              )}

              {result && (
                <Card
                  sx={{
                    border: '2px solid',
                    borderColor: 'success.light',
                    bgcolor: 'success.50'
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <Icon icon="mdi:check-circle" style={{ color: '#10b981', fontSize: '2rem' }} />
                      <Typography variant="h5" color="success.main">
                        Compression Complete!
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3 }}>
                      <Chip
                        icon={<Icon icon="mdi:file-size" />}
                        label={`Original: ${(video.size / (1024 * 1024)).toFixed(2)} MB`}
                        color="default"
                        variant="outlined"
                      />
                      <Chip
                        icon={<Icon icon="mdi:file-compressed" />}
                        label={`Compressed: ${(result.size / (1024 * 1024)).toFixed(2)} MB`}
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        icon={<Icon icon="mdi:percent" />}
                        label={`Reduction: ${(((video.size - result.size) / video.size) * 100).toFixed(1)}%`}
                        color="success"
                        variant="filled"
                      />
                    </Box>

                    <ResultCard result={result} onReset={handleReset} />
                  </CardContent>
                  
                  <CardActions sx={{ justifyContent: 'space-between', px: 3, pb: 3 }}>
                    <Button
                      variant="outlined"
                      startIcon={<Icon icon="mdi:refresh" />}
                      onClick={handleReset}
                    >
                      Compress Another
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<Icon icon="mdi:download" />}
                      href={result.url}
                      download={result.name}
                    >
                      Download Video
                    </Button>
                  </CardActions>
                </Card>
              )}
            </>
          )}
        </Paper>

        {/* Footer Info */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Icon icon="mdi:information" />
            Supports MP4, AVI, MOV, and other common video formats
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}