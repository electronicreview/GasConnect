import React from 'react';
import { Button as PaperButton, useTheme } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Link({ text, icon, ...rest }) {
    const { colors } = useTheme();
    return (
        <PaperButton
            mode="text"
            icon={() => <MaterialCommunityIcons name={icon} size={22} color={colors.primary} />}
            {...rest}
        >
            {text}
        </PaperButton>
    );
}

export default Link;