import React from 'react';
import { IconButton as PaperIconButton } from "react-native-paper";

function IconButton({ icon, color, size, ...rest }) {
    return (
        <PaperIconButton
            icon={icon}
            color={color}
            size={size}
            {...rest}
        >
        </PaperIconButton>
    );
}

export default IconButton;