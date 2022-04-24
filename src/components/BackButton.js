import React from 'react';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

// custom back button component
function BackButton({ globalState, setKey, text, icon, ...rest }) {
    const { colors } = useTheme();
    const navigation = useNavigation(); 

    return (
        <MaterialCommunityIcons name="keyboard-backspace" size={25} color={colors.primary} 
            style={{ marginHorizontal: 20}} onPress={() => navigation.goBack()} />
    );
}

export default BackButton;