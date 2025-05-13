import { StyleSheet, View } from "react-native";
import { ThemedView } from "../shared/ThemedView";
import { PillsIcon } from "../shared/Icons";
import { ThemedText } from "../shared/ThemedText";
import { PrimaryColor } from "@/constants/Colors";

export function MedicationHeader({ name, dosage }: { name: string; dosage?: string }) {
    return (
        <View style={styles.header}>
            <ThemedView style={styles.icon}>
                <PillsIcon size={64} color={PrimaryColor} />
            </ThemedView>
            <View>
                <ThemedText size="2xl" variant="bold">{name}</ThemedText>
                <ThemedText size="large" variant="semibold" style={{ opacity: 0.5 }}>{dosage}</ThemedText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: { flexDirection: "row", gap: 32, alignItems: "center" },
    icon: { borderRadius: 16, padding: 16 },
});
