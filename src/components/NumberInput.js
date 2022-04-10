import React from 'react';
import {
    StyleSheet
} from 'react-native';
import { TextInput as PaperTextInput } from "react-native-paper";
import CurrencyInput from 'react-native-currency-input';
import globalStyles from "../styles/style";
import constants from '../utils/constants';

function NumberInput({ placeholder, value, icon, onChangeText, ...rest }) {
    return (
        <PaperTextInput
            label={placeholder}
            placeholder={placeholder}
            mode={constants.MODE}
            style={localStyles.textInput}
            theme={{ roundness: constants.ROUNDNESS }}
            left={<PaperTextInput.Icon name={icon} size={20} color="#666" />}
            {...rest}
            render={props =>
                <CurrencyInput
                    {...props}
                    delimiter=","
                    separator="."
                    prefix='$'
                    precision={2}
                    value={value}
                    onChangeValue={onChangeText}
                />}
        ></PaperTextInput>
    );
}

export default NumberInput;

const localStyles = StyleSheet.create({
    textInput: {
        ...globalStyles.textInput
    }
});