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
import { StyleSheet } from "react-native";

export default function Index() {
    const { id } = useLocalSearchParams();
    const { t } = useTranslation();
    const repository = new MedicationRepository();
    const [medication, setMedication] = useState<Medication | null>(null);

    useEffect(() => {
        repository.getById(Number(id)).then(setMedication).catch(console.error);
    }, []);

    if (!medication) return <ThemedView variant="background" style={styles.container} />;

    const updateRecipeInDb = async (uri?: string) => {
        try {
            await repository.update(medication.id!, { ...medication, recipeUri: uri });
            console.log(uri);
        } catch (error) {
            console.error("Failed to update recipe in DB:", error);
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
            <ThemedView variant="background" style={styles.container}>
                <MedicationHeader name={medication.name} dosage={medication.dosage} />
                <MedicationUnitsSection units={medication.medicationUnits} />
                <MedicationRemindersSection reminders={medication.reminders} />
                <MedicationRecipeSection recipeUri={medication.recipeUri} onChange={updateRecipeInDb} />
                <MedicationNotesSection notes={medication.notes} />
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, paddingVertical: 16, gap: 24 },
});
