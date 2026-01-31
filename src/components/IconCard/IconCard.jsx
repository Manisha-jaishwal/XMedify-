import { Box, Stack, Typography } from "@mui/material";

export default function IconCard({
  img,
  title,
  bgColor,
  active = false,
  shadow = false,
}) {
  const containerBg = active ? "rgba(42,167,255,0.08)" : bgColor;
  const borderStyle = active ? "1px solid #2AA7FF" : "none";
  const elevation = shadow ? "0 0 24px rgba(0,0,0,0.09)" : "none";
  const textColor = active ? "primary.main" : "#ABB6C7";

  return (
    <Stack
      spacing={2}
      alignItems="center"
      p={3}
      borderRadius={2}
      bgcolor={containerBg}
      border={borderStyle}
      boxShadow={elevation}
    >
      <Box component="img" src={img} width={60} height={60} />

      <Typography
        fontSize={18}
        fontWeight={active ? 600 : 400}
        color={textColor}
      >
        {title}
      </Typography>
    </Stack>
  );
}
