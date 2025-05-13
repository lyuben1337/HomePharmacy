import { TextStyle } from "react-native";
import { Href, Link } from "expo-router";
import { ThemedText, ThemedTextProps } from "@/components/shared/ThemedText";
import { PrimaryColor } from "@/constants/Colors";

export type ThemedLinkProps = {
  href: Href;
  label?: string;
  size?: ThemedTextProps["size"];
  variant?: ThemedTextProps["variant"];
  style?: TextStyle;
};

export function ThemedLink({
  style,
  href,
  label,
  size,
  variant,
}: ThemedLinkProps) {
  return (
    <Link
      href={href} style={[style, { alignSelf: "flex-start", width: 'auto' }]}>
      <ThemedText
        size={size}
        variant={variant}
        lightColor={PrimaryColor}
        darkColor={PrimaryColor}
      >
        {label ? label : (href as string)}
      </ThemedText>
    </Link>
  );
}

