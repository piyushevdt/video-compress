"use client";
import { Button, Stack, Box } from "@mui/material";
import { Icon } from "@iconify/react";

export default function CompressionOptions({ onCompress }) {
  const options = [
    { 
      level: "low", 
      label: "High Compression", 
      color: "success",
      icon: "mdi:compress",
      description: "Smaller file size, lower quality"
    },
    { 
      level: "medium", 
      label: "Medium Compression", 
      color: "primary",
      icon: "mdi:balance",
      description: "Balanced size & quality"
    },
    { 
      level: "high", 
      label: "Low Compression", 
      color: "secondary",
      icon: "mdi:quality-high",
      description: "Best quality, larger size"
    },
  ];

  return (
    <Stack
      spacing={3}
      direction={{ xs: "column", sm: "row" }}
      justifyContent="center"
      alignItems="center"
    >
      {options.map((option) => (
        <Box key={option.level} textAlign="center">
          <Button
            variant="contained"
            color={option.color}
            onClick={() => onCompress(option.level)}
            startIcon={<Icon icon={option.icon} />}
            sx={{
              minWidth: 200,
              py: 2,
              background: option.level === 'medium' 
                ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                : option.level === 'low'
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                : 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
            }}
          >
            {option.label}
          </Button>
          <Box mt={1}>
            <small style={{ color: '#64748b', fontSize: '0.85rem' }}>
              {option.description}
            </small>
          </Box>
        </Box>
      ))}
    </Stack>
  );
}