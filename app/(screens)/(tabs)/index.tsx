import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/shared/ThemedView";
import { ThemedList } from "@/components/shared/ThemedList";
import { Medication } from "@/models/Medication";
import { MedicationRepository } from "@/repositories/MedicationRepository";
import { router } from "expo-router";
import { MedicationFormModal } from "@/components/medications/MedicationFormModal";

export default function Index() {
    const [medications, setMedications] = useState<Medication[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const repository = new MedicationRepository();

    const loadMeds = async () => {
        try {
            const meds = await repository.getAll();
            setMedications(meds);
        } catch (error) {
            console.error("Помилка при завантаженні медикаментів:", error);
        }
    };

    useEffect(() => {
        loadMeds();
    }, []);

    const handleAddMedication = () => {
        setModalVisible(true);
    };

    return (
        <ThemedView style={styles.container} variant="background">
            <ThemedList
                containerStyle={styles.list}
                items={medications}
                getLabel={(med) => med.name}
                onItemPress={(med) => router.navigate(`/medications/${med.id}`)}
                newItemPress={handleAddMedication}
            />
            <MedicationFormModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onCreated={loadMeds}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 0,
        gap: 12,
    },
    list: {
        flex: 1,
    },
});
