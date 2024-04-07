import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import COLORS from '../constants/colors';

interface ButtonProps {
    title: string;
    onPress: () => void;
    filled?: boolean;
    color?: string;
    style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    filled = true,
    color,
    style,
}: ButtonProps) => {
    const filledBgColor = color || COLORS.primary;
    const outlinedColor = COLORS.white;
    const bgColor = filled ? filledBgColor : outlinedColor;
    const textColor = filled ? COLORS.white : COLORS.primary;

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: bgColor }, style]}
            onPress={onPress}
        >
            <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 10,
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
    },
});

export default Button;
