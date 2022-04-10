
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import keys from "../store/keys";
import { Text, HelperText, Avatar, Title } from "react-native-paper";
import session from "../store/session";
import globalStyles from "../styles/style";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { windowWidth } from "../utils/dimensions";
import userService from "../services/user";
import { useIsFocused } from "@react-navigation/native";
import constants from "../utils/constants";
import { useNavigation } from '@react-navigation/native';

function Profile(props) {

    const navigation = useNavigation(); 
    const isFocused = useIsFocused();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            let user = session.getParsed(keys.user) || false;
            if (user) {
                setUser(user);
                setName(user.name);
                setAddress(user.address);
            }
        }

        return () => { isMounted = false };
    }, [isFocused]);

    const onSubmit = () => {
        if (!name || !address) {
            setErrorMessage(`Please provide all fields.`);
            return;
        }

        console.log("update: ", user._id, name, address);
        userService.update(user._id, name, address)
            .then(result => {
                if (result.error) {
                    setSuccessMessage(null);
                    setErrorMessage(result.error);
                    return;
                }

                const data = result.data;
                setErrorMessage(null);
                setSuccessMessage(`Profile updated successfully!`);
                session.setStringified(keys.user, data);
            });
    }

    return (
        <View style={localStyles.container}>
            <Title style={localStyles.screenHeading}>
                My Profile
            </Title>
            <View style={globalStyles.flex}>
                <TextInput
                    placeholder="Full name"
                    value={name}
                    onChangeText={setName}
                    icon="account"
                    style={localStyles.textInput}
                ></TextInput>
                <TextInput
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                    icon="home"
                    style={localStyles.textInput}
                ></TextInput>
                {
                    errorMessage &&
                    <View style={localStyles.alignHorizontal}>
                        <HelperText type="error" style={localStyles.errorHelper}>
                            {errorMessage}
                        </HelperText>
                    </View>
                }
                {
                    successMessage &&
                    <View style={localStyles.alignHorizontal}>
                        <HelperText type="info" style={localStyles.successHelper}>
                            {successMessage}
                        </HelperText>
                    </View>
                }
                <Button
                    text="Save Changes"
                    style={localStyles.btnSubmit}
                    onPress={onSubmit}
                    icon="content-save"
                >
                </Button>
            </View>
        </View>
    );
}

export default Profile;

const localStyles = StyleSheet.create({
	container: {
		...globalStyles.container
	},
    profile: {
		...globalStyles.logo,
		marginBottom: 10,
        height: 100,
        width: 100,
        borderRadius: 100
    },
    screenHeading: {
        ...globalStyles.screenHeading,
        marginBottom: 30,
        marginTop: 50
    },
    errorHelper: {
        ...globalStyles.errorHelper,
        marginTop: 10
    },
    successHelper: {
        ...globalStyles.successHelper,
        marginTop: 10
    },
    btnSubmit: {
        ...globalStyles.btnPrimary,
		marginTop: 30
    },
    btnText: {
        ...globalStyles.btnText,
        height: 40
    },
    alignHorizontal: {
        ...globalStyles.alignHorizontal,        
        width: windowWidth - 50
    },
    logo: {
        ...globalStyles.logo,
        marginTop: 70,
        marginBottom: 30
    },
    textInput: {
        ...globalStyles.textInput,
        marginBottom: 5
    },
	city: {
		paddingLeft: 5,
		marginTop: 10,
		fontSize: 14
	}
});