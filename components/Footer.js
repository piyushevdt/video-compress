"use client";
import { Box, Typography, Stack, IconButton, Tooltip } from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: "GitHub",
      icon: "mdi:github",
      url: "https://github.com/piyushevdt",
      color: "#333",
      hoverColor: "#4078c0"
    },
    {
      name: "Portfolio",
      icon: "gg:website",
      url: "https://portfolio-six-beta-17.vercel.app/",
      color: "#3b82f6",
      hoverColor: "#1d4ed8"
    },
    {
      name: "Email",
      icon: "mdi:email",
      url: "mailto:piyushkdbittu@gmail.com",
      color: "#ea4335",
      hoverColor: "#d93025"
    },
    {
      name: "LinkedIn",
      icon: "mdi:linkedin",
      url: "https://www.linkedin.com/in/piyush-kumar-dewangan-94124a256/",
      color: "#0a66c2",
      hoverColor: "#004182"
    }
  ];

  const quickLinks = [
    { name: "Privacy Policy", url: "/privacy" },
    { name: "Terms of Service", url: "/terms" },
    { name: "FAQ", url: "/faq" },
    { name: "Contact", url: "/contact" }
  ];

  return (
    <Box 
      component="footer"
      sx={{ 
        py: { xs: 4, md: 6 }, 
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: 'white',
        mt: 'auto',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Stack 
          direction={{ xs: "column", md: "row" }} 
          justifyContent="space-between" 
          alignItems={{ xs: "center", md: "flex-start" }}
          spacing={{ xs: 4, md: 0 }}
          mb={4}
        >
          {/* Brand Section */}
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Icon 
                icon="mdi:video-compress" 
                width={32} 
                height={32} 
                style={{ color: '#6366f1' }} 
              />
              <Typography variant="h6" fontWeight={700}>
                Video Reducer
              </Typography>
            </Box>
            <Typography variant="body2" color="rgba(255,255,255,0.7)" maxWidth={300}>
              Compress your videos online for free. Fast, secure, and easy to use.
            </Typography>
          </Box>

          {/* Quick Links */}
          {/* <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {quickLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.url} 
                  style={{ textDecoration: 'none' }}
                >
                  <Typography 
                    variant="body2" 
                    color="rgba(255,255,255,0.7)"
                    sx={{ 
                      '&:hover': { 
                        color: '#6366f1',
                        transform: 'translateX(2px)',
                        transition: 'all 0.2s ease'
                      },
                      cursor: 'pointer'
                    }}
                  >
                    {link.name}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Box> */}

          {/* Connect Section */}
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Connect With Us
            </Typography>
            <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
              {socialLinks.map((social) => (
                <Tooltip key={social.name} title={social.name} arrow>
                  <IconButton 
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ 
                      background: `rgba(255,255,255,0.1)`,
                      color: 'white',
                      '&:hover': { 
                        background: social.hoverColor,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 4px 20px ${social.hoverColor}40`
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Icon icon={social.icon} width={20} height={20} />
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </Box>
        </Stack>

        {/* Divider */}
        <Box 
          sx={{ 
            height: '1px', 
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            my: 4 
          }} 
        />

        {/* Bottom Bar */}
        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          justifyContent="space-between" 
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            © {currentYear} Video Size Reducer. All rights reserved.
          </Typography>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="caption" color="rgba(255,255,255,0.5)">
              Version 1.0.0
            </Typography>
            <Typography 
              variant="body2" 
              color="rgba(255,255,255,0.7)"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              Made with <Icon icon="mdi:heart" style={{ color: '#ec4899' }} /> by&nbsp;
              <Link 
                href="https://yourportfolio.com" 
                style={{ 
                  color: '#6366f1', 
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': { textDecoration: 'underline' }
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Your Name
              </Link>
            </Typography>
          </Stack>
        </Stack>

        {/* Tech Stack Badges */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2, flexWrap: 'wrap' }}>
          <Typography 
            variant="caption" 
            sx={{ 
              background: 'rgba(99, 102, 241, 0.2)', 
              color: '#818cf8',
              px: 1.5,
              py: 0.5,
              borderRadius: 4,
              border: '1px solid rgba(99, 102, 241, 0.3)'
            }}
          >
            Next.js
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              background: 'rgba(59, 130, 246, 0.2)', 
              color: '#60a5fa',
              px: 1.5,
              py: 0.5,
              borderRadius: 4,
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}
          >
            Material-UI
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              background: 'rgba(236, 72, 153, 0.2)', 
              color: '#f472b6',
              px: 1.5,
              py: 0.5,
              borderRadius: 4,
              border: '1px solid rgba(236, 72, 153, 0.3)'
            }}
          >
            FFmpeg
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

function Container({ children, maxWidth = "lg" }) {
  return (
    <Box sx={{ maxWidth, margin: '0 auto', px: 3 }}>
      {children}
    </Box>
  );
}