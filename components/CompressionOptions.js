"use client";
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  CardActionArea,
  Tooltip,
  Fade
} from '@mui/material';
import { Icon } from '@iconify/react';

export default function CompressionOptions({ onCompress }) {
  const options = [
    {
      level: 'low',
      title: 'High Compression',
      description: 'Smaller file size, lower quality',
      icon: 'mdi:file-compress',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      iconColor: '#10b981',
      details: 'Compresses up to 90% - Ideal for sharing'
    },
    {
      level: 'medium',
      title: 'Medium Compression',
      description: 'Balanced size & quality',
      icon: 'mdi:scale-balance',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      iconColor: '#6366f1',
      details: 'Compresses up to 60% - Best for general use'
    },
    {
      level: 'high',
      title: 'Low Compression',
      description: 'Best quality, larger size',
      icon: 'mdi:quality-high',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
      iconColor: '#ec4899',
      details: 'Compresses up to 30% - Professional quality'
    }
  ];

  const handleOptionClick = (level) => {
    if (onCompress) {
      onCompress(level);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography 
        variant="h5" 
        component="h3" 
        sx={{ 
          textAlign: 'center', 
          mb: 4, 
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          color: 'primary.main'
        }}
      >
        <Icon icon="mdi:compression" fontSize="1.5rem" />
        Select Compression Level
      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        {options.map((option) => (
          <Grid item xs={12} sm={6} md={4} key={option.level}>
            <Tooltip 
              title={option.details} 
              arrow
              placement="top"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <Card
                sx={{
                  height: '100%',
                  background: option.gradient,
                  color: 'white',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    '& .MuiCardActionArea': {
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }
                }}
                elevation={4}
              >
                <CardActionArea
                  onClick={() => handleOptionClick(option.level)}
                  sx={{ 
                    height: '100%',
                    p: 0,
                    '&:focus': {
                      outline: '2px solid rgba(255,255,255,0.5)',
                      outlineOffset: 2
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    {/* Icon */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        bgcolor: 'rgba(255,255,255,0.2)',
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        mx: 'auto'
                      }}
                    >
                      <Icon 
                        icon={option.icon} 
                        style={{ 
                          fontSize: '2rem',
                          color: option.iconColor 
                        }} 
                      />
                    </Box>

                    {/* Title */}
                    <Typography 
                      variant="h6" 
                      component="h4" 
                      sx={{ 
                        fontWeight: 700, 
                        mb: 1,
                        fontSize: '1.25rem'
                      }}
                    >
                      {option.title}
                    </Typography>

                    {/* Description */}
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        opacity: 0.9,
                        mb: 2,
                        fontSize: '0.875rem'
                      }}
                    >
                      {option.description}
                    </Typography>

                    {/* Level Indicator */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 0.5,
                        mt: 2
                      }}
                    >
                      {[1, 2, 3].map((dot) => (
                        <Box
                          key={dot}
                          sx={{
                            width: dot === 1 ? 8 : dot === 2 ? 10 : 12,
                            height: dot === 1 ? 8 : dot === 2 ? 10 : 12,
                            borderRadius: '50%',
                            bgcolor: option.level === 'low' && dot <= 1 ? 
                              'white' : 
                              option.level === 'medium' && dot <= 2 ? 
                              'white' : 
                              option.level === 'high' && dot <= 3 ? 
                              'white' : 
                              'rgba(255,255,255,0.3)',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      ))}
                    </Box>

                    {/* Click Indicator */}
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        mt: 3,
                        opacity: 0.8,
                        fontSize: '0.75rem',
                        letterSpacing: '0.5px'
                      }}
                    >
                      Click to select
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Tooltip>
          </Grid>
        ))}
      </Grid>

      {/* Additional Info */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            fontSize: '0.875rem'
          }}
        >
          <Icon icon="mdi:information" />
          The compression process may take a few moments depending on your video size
        </Typography>
      </Box>
    </Box>
  );
}