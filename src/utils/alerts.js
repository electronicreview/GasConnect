import React from 'react';
import { Alert } from "react-native";
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

// error Alert popup
export const alertError = message => {
    return Alert.alert(
        "Error",
        message,
        [
            { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    );
}

// confirmation Alert popup
export const alertConfirm = ({
    title = "Are you sure?", 
    message = "You will not be able revert this action.",
    onConfirm = null
}) => {
    return Alert.alert(
        title,
        message,
        [
            { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
            { text: "OK", onPress: onConfirm }
        ]
    );
}