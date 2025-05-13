import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Portal from "@/components/shared/Portal";
import { useThemeColor } from "@/hooks/useThemeColor";

export function LoadingOverlay() {
  return (
    <Portal name="LoadingOverlay">
      <View style={styles.container}>
        <ActivityIndicator size="large" color={useThemeColor("text")} />
      </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
});
