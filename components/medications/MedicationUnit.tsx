import { MedicationUnit as Unit } from "@/models/MedicationUnit"
import { ThemedView } from "../shared/ThemedView";
import { ThemedText } from "../shared/ThemedText";
import { Pressable, StyleSheet, View } from "react-native";
import { BlisterPackIcon } from "../shared/Icons";
import { PrimaryColor } from "@/constants/Colors";
import { useTranslation } from "react-i18next";
import { hexToRgba } from "@/utils/colors";
import { formatDate } from "@/utils/format-date";

type MedicationUnitProps = {
    unit: Unit;
    onLongPress?: () => void;
}

export function MedicationUnit({ unit, onLongPress }: MedicationUnitProps) {
    const { t } = useTranslation();
    const backgroundColor = hexToRgba(PrimaryColor, 0.1);

    return (
        <Pressable onLongPress={onLongPress}>
            <ThemedView style={styles.container} lightColor={backgroundColor} darkColor={backgroundColor}>
                <View style={styles.header}>
                    <BlisterPackIcon size={36} color={PrimaryColor} />
                    <View style={{ alignItems: "center" }}>
                        <ThemedText size="xl" variant="bold">
                            {unit.doseCount}
                        </ThemedText>
                        <ThemedText variant="bold">
                            {t('medication-unit.dose', { count: unit.doseCount })}
                        </ThemedText>
                    </View>
                </View>
                <ThemedText size="small" variant="semibold">
                    {t('shared.until')} {formatDate(new Date(unit.expirationDate), "numeric")}
                </ThemedText>
            </ThemedView >
        </Pressable>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderRadius: 8,
        gap: 12,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
    }
});