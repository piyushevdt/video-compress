"use client";
import { AppBar, Toolbar, Typography, Box, Chip } from "@mui/material";
import { Icon } from "@iconify/react";

export default function Header() {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ py: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          flexGrow: 1,
          gap: 2
        }}>
          <Box sx={{
            background: 'white',
            borderRadius: '50%',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon 
              icon="hugeicons:video-01" 
              width={32} 
              height={32}
              style={{ color: '#6366f1' }}
            />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Video Size Reducer
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Compress videos without quality loss
            </Typography>
          </Box>
        </Box>
        
        <Chip 
          label="FREE" 
          sx={{ 
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            fontWeight: 600
          }}
        />
      </Toolbar>
    </AppBar>
  );
}