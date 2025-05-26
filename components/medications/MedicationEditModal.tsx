import { useState } from "react";
import ThemedModal from "@/components/shared/ThemedModal";
import ThemedInput from "@/components/shared/ThemedInput";
import { ThemedButton } from "@/components/shared/ThemedButton";
import { Medication } from "@/models/Medication";
import { MedicationRepository } from "@/repositories/MedicationRepository";

type Props = {
    visible: boolean;
    medication: Medication;
    onClose: () => void;
    onUpdated: (updated: Medication) => void;
};

export function MedicationEditModal({ visible, medication, onClose, onUpdated }: Props) {
    const [name, setName] = useState(medication.name);
    const [dosage, setDosage] = useState(medication.dosage ?? "");
    const repository = new MedicationRepository();

    const handleSave = async () => {
        const updated = { ...medication, name, dosage };
        await repository.update(medication.id!, updated);
        onUpdated(updated);
        onClose();
    };

    return (
        <ThemedModal isVisible={visible} title="Редагування" onClose={onClose} variant="medium">
            <ThemedInput placeholder="Назва" value={name} onChangeText={setName} />
            <ThemedInput placeholder="Дозування" value={dosage} onChangeText={setDosage} />
            <ThemedButton label="Зберегти" onPress={handleSave} />
        </ThemedModal>
    );
}
