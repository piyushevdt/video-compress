"use client";
import { Container, Box, Fade } from "@mui/material";
import Header from "../components/Header";
import VideoUploader from "../components/VideoUploader";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Fade in={true} timeout={800}>
          <Box 
            mt={{ xs: 4, sm: 6, md: 8 }} 
            mb={{ xs: 4, sm: 6, md: 8 }}
            sx={{
              animation: 'fadeInUp 0.8s ease-out',
              '@keyframes fadeInUp': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(20px)'
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0)'
                }
              }
            }}
          >
            <VideoUploader />
          </Box>
        </Fade>
      </Container>
      <Footer />
    </>
  );
}