import { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/shared/ThemedText";
import { ThemedView } from "@/components/shared/ThemedView";
import { NoteStickerIcon, PencilIcon, CheckIcon } from "@/components/shared/Icons";
import ThemedInput from "@/components/shared/ThemedInput";

type Props = {
    notes?: string;
    onSave: (updatedNotes: string) => void;
};

export function MedicationNotesSection({ notes = "", onSave }: Props) {
    const { t } = useTranslation();
    const textColor = useThemeColor("text");

    const [isEditing, setIsEditing] = useState(false);
    const [tempNotes, setTempNotes] = useState(notes);

    const handleSave = () => {
        onSave(tempNotes);
        setIsEditing(false);
    };

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleView}>
                    <NoteStickerIcon size={28} color={textColor} />
                    <ThemedText size="xl" variant="bold">
                        {t("medication.notes")}
                    </ThemedText>
                </View>

                <Pressable onPress={isEditing ? handleSave : () => setIsEditing(true)}>
                    {isEditing ? (
                        <CheckIcon size={20} color={textColor} />
                    ) : (
                        <PencilIcon size={18} color={textColor} />
                    )}
                </Pressable>
            </View>

            <ThemedView style={styles.notesView}>
                {isEditing ? (
                    <ThemedInput
                        multiline
                        value={tempNotes}
                        onChangeText={setTempNotes}
                        placeholder="Додайте нотатки..."
                    />
                ) : (
                    <ThemedText>{notes || "Додайте нотатки..."}</ThemedText>
                )}
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
        alignItems: "center",
    },
    sectionTitleView: {
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
    },
    notesView: {
        padding: 16,
        minHeight: 120,
    },
});
