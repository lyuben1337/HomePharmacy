import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { ThemedText } from "@/components/shared/ThemedText";
import { ThemedView } from "@/components/shared/ThemedView";
import { NoteStickerIcon } from "@/components/shared/Icons";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
    notes?: string;
};

export function MedicationNotesSection({ notes }: Props) {
    const { t } = useTranslation();
    const textColor = useThemeColor("text");

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleView}>
                    <NoteStickerIcon size={28} color={textColor} />
                    <ThemedText size="xl" variant="bold">
                        {t("medication.notes")}
                    </ThemedText>
                </View>
            </View>
            <ThemedView style={styles.notesView}>
                <ThemedText>{notes}</ThemedText>
            </ThemedView>
        </View>
    );
}

const styles = StyleSheet.create({
    section: { gap: 16 },
    sectionHeader: {
        flexDirection: "row",
        marginHorizontal: 16,
        justifyContent: "space-between",
    },
    sectionTitleView: {
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
    },
    notesView: {
        padding: 16,
        height: 120,
    },
});
