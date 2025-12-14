export function compressVideo(file, quality, setProgress) {
  return new Promise((resolve) => {
    const videoElement = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    videoElement.preload = 'metadata';
    videoElement.src = URL.createObjectURL(file);
    
    videoElement.onloadedmetadata = async () => {
      // Set compression parameters based on quality level
      const scale = quality === 'low' ? 0.5 : quality === 'medium' ? 0.7 : 0.85;
      const bitrate = quality === 'low' ? 500000 : quality === 'medium' ? 1000000 : 2000000;
      
      // Set canvas dimensions
      canvas.width = videoElement.videoWidth * scale;
      canvas.height = videoElement.videoHeight * scale;
      
      // Create media stream from canvas
      const stream = canvas.captureStream(30);
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: bitrate
      });
      
      const chunks = [];
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const originalSize = (file.size / (1024 * 1024)).toFixed(2);
        const compressedSize = (blob.size / (1024 * 1024)).toFixed(2);
        
        resolve({
          originalSize: parseFloat(originalSize),
          compressedSize: parseFloat(compressedSize),
          url: URL.createObjectURL(blob),
          filename: file.name.replace(/\.[^/.]+$/, '') + '_compressed.webm'
        });
      };
      
      // Start recording
      mediaRecorder.start();
      videoElement.play();
      
      // Draw frames to canvas
      const drawFrame = () => {
        if (!videoElement.paused && !videoElement.ended) {
          ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          const currentProgress = (videoElement.currentTime / videoElement.duration) * 100;
          setProgress(Math.min(currentProgress, 95));
          requestAnimationFrame(drawFrame);
        } else {
          setProgress(100);
          mediaRecorder.stop();
          videoElement.remove();
        }
      };
      
      drawFrame();
    };
  });
}