import React from 'react';
import {
    StyleSheet
} from 'react-native';
import { TextInput as PaperTextInput } from "react-native-paper";
import globalStyles from "../styles/style";
import constants from '../utils/constants';

// custom text input component
function TextInput({ placeholder, value, icon, onChangeText, ...rest }) {
    return (
        <PaperTextInput
            label={placeholder}
            placeholder={placeholder}
            value={value}
            mode={constants.MODE}
            onChangeText={onChangeText}
            style={localStyles.textInput}
            theme={{ roundness: constants.ROUNDNESS }}
            dense={true}            
            {...rest}
            left={<PaperTextInput.Icon name={icon} size={20} color="#666" />}
        ></PaperTextInput>
    );
}

export default TextInput;

const localStyles = StyleSheet.create({
    textInput: {
        ...globalStyles.textInput
    }
});