import { PrimaryColor } from "@/constants/Colors";
import { PlusIcon } from "./Icons";
import { ThemedPressable } from "./ThemedPressable";
import { ViewStyle } from "react-native";

type PlusButtonProps = {
    onPress?: () => void;
    style?: ViewStyle;
    disabled?: boolean;
};

export function PlusButton({ onPress, style, disabled = false }: PlusButtonProps) {
    return (
        <ThemedPressable variant="icon" onPress={onPress} style={style} disabled={disabled}>
            <PlusIcon
                size={20}
                color={PrimaryColor}
            />
        </ThemedPressable>
    )
}