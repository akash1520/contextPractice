import * as MUIcon from "@mui/icons-material";

interface IconProps {
  name: keyof typeof MUIcon;
  [key: string]: any;
}

const CustomIcon = ({ name, ...props }: IconProps) => {
  const Icon = name && MUIcon[name];
  return Icon ? <Icon {...props} /> : null;
};

export default CustomIcon;
