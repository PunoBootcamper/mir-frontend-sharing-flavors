import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="userProfile__recipesTab-panel"
    >
      {value === index && (
        <Box>
          {children} {/* Cambiado: No se envuelve en Typography */}
        </Box>
      )}
    </div>
  );
};
