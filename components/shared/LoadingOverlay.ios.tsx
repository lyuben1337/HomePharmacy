import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import Portal from "@/components/shared/Portal";
import { useThemeColor } from "@/hooks/useThemeColor";
import { BlurView } from "expo-blur";

export function LoadingOverlay() {
  return (
    <Portal name="LoadingOverlay">
      <BlurView intensity={35} tint="prominent" style={styles.container}>
        <ActivityIndicator size="large" color={useThemeColor("text")} />
      </BlurView>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
});
