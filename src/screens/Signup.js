
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
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import Link from "../components/Link";
import { windowWidth } from "../utils/dimensions";
import validator from 'validator';
import userService from "../services/user";
import { useNavigation } from '@react-navigation/native';
import session from "../store/session";
import keys from "../store/keys";

function Signup(props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigation = useNavigation(); 

    useEffect(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
    }, []);

    const onSubmit = () => {
        if (!name || !email || !password) {
            setErrorMessage(`Please provide all fields.`);
            return;
        }

        if (!validator.isEmail(email)) {
            setErrorMessage(`Please provide a valid email address.`);
            return;
        }

        userService.signup(name, email, password)
            .then(result => {
                if (result.error) {
                    setSuccessMessage(null);
                    setErrorMessage(result.error);
                    return;
                }

                setErrorMessage(null);
                setSuccessMessage(`Signup successfully!`);
                
                const data = result.data;
                session.setStringified(keys.user, data);
                session.set(keys.isLoggedIn, "true");
                navigation.navigate("DrawerHome");
            });
    }

    return (
        <ScrollView contentContainerStyle={globalStyles.container}>
            <Image source={require("../assets/logo.png")} style={localStyles.logo} />
            <Title style={localStyles.screenHeading}>
                Signup
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
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    icon="email"
                    style={localStyles.textInput}
                ></TextInput>
                <PasswordInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={localStyles.textInput}
                ></PasswordInput>
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
                    text="Signup"
                    style={localStyles.btnSubmit}
                    onPress={onSubmit}
                    icon="account-check"
                >
                </Button>
                <Link
                    text="Login here"
                    style={localStyles.btnText}
                    onPress={() => navigation.navigate("Login")}
                >
                </Link>
            </View>
        </ScrollView>
    );
}

export default Signup;

const localStyles = StyleSheet.create({
    logo: {
    },
    screenHeading: {
        ...globalStyles.screenHeading,
        marginBottom: 30,
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