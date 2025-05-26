import { useState } from "react";
import ThemedModal from "@/components/shared/ThemedModal";
import ThemedInput from "@/components/shared/ThemedInput";
import { ThemedButton } from "@/components/shared/ThemedButton";
import { MedicationRepository } from "@/repositories/MedicationRepository";

type MedicationFormModalProps = {
    visible: boolean;
    onClose: () => void;
    onCreated: () => void;
};

export function MedicationFormModal({ visible, onClose, onCreated }: MedicationFormModalProps) {
    const [name, setName] = useState("");
    const [dosage, setDosage] = useState("");
    const [notes, setNotes] = useState("");
    const repository = new MedicationRepository();

    const handleCreate = async () => {
        if (!name.trim()) return;
        await repository.create({ name, dosage, notes });
        setName(""); setDosage(""); setNotes("");
        onCreated();
        onClose();
    };

    return (
        <ThemedModal isVisible={visible} title="Новий медикамент" onClose={onClose} variant="medium">
            <ThemedInput placeholder="Назва" value={name} onChangeText={setName} />
            <ThemedInput placeholder="Дозування" value={dosage} onChangeText={setDosage} />
            <ThemedInput placeholder="Нотатки" value={notes} onChangeText={setNotes} multiline />
            <ThemedButton label="Зберегти" onPress={handleCreate} />
        </ThemedModal>
    );
}
