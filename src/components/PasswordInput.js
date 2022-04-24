import React, { useState } from 'react';
import {
    StyleSheet
} from 'react-native';
import { TextInput as PaperTextInput } from "react-native-paper";
import globalStyles from "../styles/style";
import constants from '../utils/constants';

// custom password input component
function PasswordInput({ placeholder, value, onChangeText, ...rest }) {

    const [icon, setIcon] = useState("eye");
    const [isSecure, setIsSecure] = useState(true);

    // toggling visibility of password
    const toggleSecureText = () => {
        setIsSecure(!isSecure);
        setIcon(icon === "eye" ? "eye-off" : "eye");
    }

    return (
        <PaperTextInput
            label={placeholder}
            placeholder={placeholder}
            value={value}
            mode={constants.MODE}
            onChangeText={onChangeText}
            style={localStyles.textInput}
            theme={{ roundness: constants.ROUNDNESS }}
            secureTextEntry={isSecure}
            dense={true}
            left={<PaperTextInput.Icon name="key" size={20} color="#666" />}
            right={<PaperTextInput.Icon name={icon} size={20} color="#666" onPress={toggleSecureText} />}
            {...rest}
        ></PaperTextInput>
    );
}

export default PasswordInput;

const localStyles = StyleSheet.create({
    textInput: {
        ...globalStyles.textInput
    }
});