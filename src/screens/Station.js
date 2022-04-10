
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Image,
    ScrollView
} from 'react-native';
import { Text, HelperText, Title } from "react-native-paper";
import globalStyles from "../styles/style";
import TextInput from "../components/TextInput";
import NumberInput from "../components/NumberInput";
import Button from "../components/Button";
import { windowWidth } from "../utils/dimensions";
import session from "../store/session";
import keys from "../store/keys";
import stationService from "../services/station";
import { useIsFocused } from "@react-navigation/native";

function Station(props) {

    const isFocused = useIsFocused();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            let t = session.getParsed(keys.user);
            setUser(t);
        }

        return () => { isMounted = false };
    }, [isFocused]);

    useEffect(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
    }, []);

    const onSubmit = () => {
        if (!title || !address || !price) {
            setErrorMessage(`Please provide all fields.`);
            return;
        }

        stationService.create(user._id, title, address, price)
            .then(result => {
                if (result.error) {
                    setSuccessMessage(null);
                    setErrorMessage(result.error);
                    return;
                }

                setErrorMessage(null);
                setSuccessMessage(`Station created successfully!`);
                setTitle(``);
                setAddress(``);
                setPrice(``);
            });
    }

    return (
        <ScrollView contentContainerStyle={globalStyles.container}>
            <Title style={localStyles.screenHeading}>
                Add Station
            </Title>
            <View style={globalStyles.flex}>
                <TextInput
                    placeholder="Title"
                    value={title}
                    onChangeText={setTitle}
                    icon="subtitles-outline"
                    style={localStyles.textInput}
                ></TextInput>
                <TextInput
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                    icon="home"
                    style={localStyles.textInput}
                ></TextInput>
                <NumberInput
                    placeholder="Price"
                    value={price}
                    onChangeText={setPrice}
                    icon="tag-outline"
                    style={localStyles.textInput}
                ></NumberInput>
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
        </ScrollView>
    );
}

export default Station;

const localStyles = StyleSheet.create({
    logo: {
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
        marginTop: 20,
        marginBottom: 20
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
    }
});