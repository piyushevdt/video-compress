"use client";
import { Card, Typography, Button, Box, LinearProgress, Stack, Chip } from "@mui/material";
import { Icon } from "@iconify/react";

export default function ResultCard({ result }) {
  const savedPercentage = Math.round((1 - result.compressedSize / result.originalSize) * 100);
  
  return (
    <Card sx={{ 
      mt: 4, 
      p: 4,
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      border: '1px solid #e2e8f0'
    }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        🎉 Compression Complete!
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Typography variant="body2" color="text.secondary">Space Saved</Typography>
          <Typography variant="body2" fontWeight={600} color="success.main">
            {savedPercentage}% Saved
          </Typography>
        </Stack>
        <LinearProgress 
          variant="determinate" 
          value={savedPercentage} 
          sx={{ 
            height: 8, 
            borderRadius: 4,
            background: '#e2e8f0',
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            }
          }}
        />
      </Box>
      
      <Stack spacing={2} mb={3}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          p: 2,
          background: '#f8fafc',
          borderRadius: 2,
          border: '1px solid #e2e8f0'
        }}>
          <Typography>Original Size:</Typography>
          <Typography fontWeight={600}>{result.originalSize} MB</Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          p: 2,
          background: '#f0f9ff',
          borderRadius: 2,
          border: '1px solid #bae6fd'
        }}>
          <Typography>Compressed Size:</Typography>
          <Typography fontWeight={600} color="primary.main">
            {result.compressedSize} MB
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          p: 2,
          background: '#f0fdf4',
          borderRadius: 2,
          border: '1px solid #bbf7d0'
        }}>
          <Typography>Space Saved:</Typography>
          <Typography fontWeight={600} color="success.main">
            {result.originalSize - result.compressedSize} MB
          </Typography>
        </Box>
      </Stack>
      
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<Icon icon="mdi:download" />}
          href={result.url}
          download
          sx={{
            flexGrow: 1,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            py: 1.5
          }}
        >
          Download Video
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<Icon icon="mdi:refresh" />}
          onClick={() => window.location.reload()}
          sx={{ flexGrow: 1 }}
        >
          Compress Another
        </Button>
      </Box>
    </Card>
  );
}