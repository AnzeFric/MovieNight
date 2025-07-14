import { Colors } from "@/constants/Colors";
import { Text, TextProps, TextStyle } from "react-native";

type TextTypes =
  | "extraSmall"
  | "small"
  | "normal"
  | "title"
  | "lTitle"
  | "xxlTitle";

type Props = TextProps & {
  bold?: boolean;
  type: TextTypes;
};

export default function CustomText({
  style,
  type,
  bold = false,
  ...props
}: Props) {
  const typeToSize: Record<TextTypes, number> = {
    extraSmall: 14,
    small: 16,
    normal: 20,
    title: 24,
    lTitle: 32,
    xxlTitle: 44,
  };

  const staticStyle: TextStyle = {
    fontWeight: bold ? "bold" : "normal",
    fontSize: typeToSize[type],
    color: Colors.dark.primaryText,
  };

  return <Text style={[staticStyle, style]} {...props} />;
}
