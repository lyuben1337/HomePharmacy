import { StyleSheet, View, Pressable } from "react-native";
import { ThemedView } from "../shared/ThemedView";
import { ThemedText } from "../shared/ThemedText";
import { PrimaryColor } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { PencilIcon, PillsIcon } from "../shared/Icons";

export function MedicationHeader({
    name,
    dosage,
    onPressEdit,
}: {
    name: string;
    dosage?: string;
    onPressEdit?: () => void;
}) {
    const textColor = useThemeColor("text");

    return (
        <View style={styles.header}>
            <ThemedView style={styles.icon}>
                <PillsIcon size={64} color={PrimaryColor} />
            </ThemedView>

            <View style={styles.textContainer}>
                <View style={styles.titleRow}>
                    <ThemedText size="2xl" variant="bold">
                        {name}
                    </ThemedText>
                    <Pressable onPress={onPressEdit} style={styles.editButton}>
                        <PencilIcon size={24} color={textColor} />
                    </Pressable>
                </View>
                <ThemedText size="large" variant="semibold" style={{ opacity: 0.5 }}>
                    {dosage}
                </ThemedText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        gap: 32,
        alignItems: "center",
    },
    icon: {
        borderRadius: 16,
        padding: 16,
    },
    textContainer: {
        flex: 1,
        gap: 4,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    editButton: {
        padding: 4,
    },
});
