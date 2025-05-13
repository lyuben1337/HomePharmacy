import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  size?: "default" | "small" | "medium" | "large" | "xl" | "2xl";
  variant?: "default" | "semibold" | "bold";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  size = "default",
  variant = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor("text", { light: lightColor, dark: darkColor });

  return (
    <Text
      style={[
        { color },
        sizeStyles[size],
        variantStyles[variant],
        style,
        { textAlign: "auto" },
      ]}
      {...rest}
    />
  );
}

const sizeStyles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  small: {
    fontSize: 12,
    lineHeight: 20,
  },
  medium: {
    fontSize: 18,
    lineHeight: 24,
  },
  large: {
    fontSize: 20,
    lineHeight: 24,
  },
  xl: {
    fontSize: 24,
    lineHeight: 32,
  },
  "2xl": {
    fontSize: 30,
    lineHeight: 40,
  }
});

const variantStyles = StyleSheet.create({
  default: {
    fontWeight: "normal",
  },
  semibold: {
    fontWeight: "500",
  },
  bold: {
    fontWeight: "700",
  },
});
