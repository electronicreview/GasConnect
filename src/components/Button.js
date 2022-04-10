import React from 'react';
import { Button as PaperButton } from "react-native-paper";
import constants from '../utils/constants';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Button({ text, icon, ...rest }) {
    const { colors } = useTheme();
    return (
        <PaperButton
            mode={constants.BUTTON_MODE}
            theme={{ roundness: constants.BUTTON_ROUNDNESS }}
            icon={() => <MaterialCommunityIcons name={icon} size={22} color={"#fff"} />}
            {...rest}
        >
            {text}
        </PaperButton>
    );
}

export default Button;