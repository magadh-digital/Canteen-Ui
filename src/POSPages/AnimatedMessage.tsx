import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";

const AnimatedMessage = ({ userData }: { userData: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }} 
      animate={{ opacity: 1, scale: 1, y: 0 }} 
      transition={{ duration: 0.5, ease: "easeOut" }} 
    >
      <Box 
        sx={{ 
          mt: 0, 
          p: 2, 
          backgroundColor: "#f0f8ff", 
          border: "1px solid #ddd", 
          borderRadius: "8px" 
        }}
      >
        <Typography 
          sx={{ 
            fontSize: 14, 
            fontWeight: "bold", 
            color: "#333", 
            textAlign: "center" 
          }}
        >
          🎉 Congratulations! You can order up to 
          <span style={{ color: "#ff5722" }}> ₹{userData?.vouchers || 0}</span> for free! 🎉
        </Typography>
      </Box>
    </motion.div>
  );
};


export default AnimatedMessage;