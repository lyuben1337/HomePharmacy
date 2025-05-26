import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ThemedView } from "@/components/shared/ThemedView";
import { useTranslation } from "react-i18next";
import { MedicationRepository } from "@/repositories/MedicationRepository";
import { Medication } from "@/models/Medication";
import { MedicationHeader } from "@/components/medications/MedicationHeader";
import { MedicationUnitsSection } from "@/components/medications/MedicationUnitsSection";
import { MedicationRemindersSection } from "@/components/medications/MedicationRemindersSection";
import { MedicationRecipeSection } from "@/components/medications/MedicationRecipeSection";
import { MedicationNotesSection } from "@/components/medications/MedicationNotesSection";
import { MedicationEditModal } from "@/components/medications/MedicationEditModal";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
} from "react-native";
import { ReminderRepository } from "@/repositories/ReminderRepository";


export default function Index() {
    const { id } = useLocalSearchParams();
    const { t } = useTranslation();
    const repository = new MedicationRepository();
    const [medication, setMedication] = useState<Medication | null>(null);
    const [editVisible, setEditVisible] = useState(false);

    useEffect(() => {
        repository.getById(Number(id)).then(setMedication).catch(console.error);
    }, []);

    if (!medication) return <ThemedView variant="background" style={{ flex: 1 }} />;

    const updateRecipeInDb = async (uri?: string) => {
        try {
            await repository.update(medication.id!, { ...medication, recipeUri: uri });
            console.log(uri);
        } catch (error) {
            console.error("Failed to update recipe in DB:", error);
        }
    };

    const updateNotesInDb = async (newNotes: string) => {
        try {
            const updated = { ...medication, notes: newNotes };
            await repository.update(medication.id!, updated);
            setMedication(updated);
        } catch (error) {
            console.error("❌ Помилка оновлення нотаток:", error);
        }
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: "",
                    headerBackTitle: t("screens.medications"),
                }}
            />
            <ThemedView variant="background" style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        contentContainerStyle={styles.container}
                        keyboardShouldPersistTaps="handled"
                    >
                        <MedicationHeader name={medication.name} dosage={medication.dosage} onPressEdit={() => setEditVisible(true)} />
                        <MedicationUnitsSection
                            medicationId={medication.id!}
                            units={medication.medicationUnits}
                            onUnitsChange={(updatedUnits) =>
                                setMedication({ ...medication, medicationUnits: updatedUnits })
                            }
                        />
                        <MedicationRemindersSection
                            medicationId={medication.id!}
                            reminders={medication.reminders}
                            onRemindersChange={(updatedReminders) => {
                                console.log("Updated reminders:", updatedReminders);
                                setMedication({ ...medication, reminders: [...updatedReminders] });
                            }}
                        />
                        <MedicationRecipeSection recipeUri={medication.recipeUri} onChange={updateRecipeInDb} />
                        <MedicationNotesSection notes={medication.notes} onSave={updateNotesInDb} />
                    </ScrollView>
                </KeyboardAvoidingView >
            </ThemedView >
            <MedicationEditModal
                visible={editVisible}
                medication={medication}
                onClose={() => setEditVisible(false)}
                onUpdated={(updated) => setMedication(updated)}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: { padding: 24, paddingVertical: 16, gap: 24 },
});
