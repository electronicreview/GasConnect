
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { Card, Paragraph, Text, Title, useTheme, Menu, Portal, Modal, HelperText } from "react-native-paper";
import { windowWidth } from "../utils/dimensions";
import utils from "../utils/utils";
import IconButton from "./IconButton";
import Button from "./Button";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import constants from "../utils/constants";
import globalStyles from "../styles/style";
import NumberInput from "./NumberInput";
import stationService from "../services/station";
import { useIsFocused } from "@react-navigation/native";
import session from "../store/session";
import keys from "../store/keys";
import { alertError, alertConfirm } from "../utils/alerts";

function StationRow(props) {

    let station = props.data.item;
    const isFocused = useIsFocused();
    const [menuVisiblility, setMenuVisibility] = useState(false);
    const [showMakeOffer, setShowMakeOffer] = useState(false);
    const [offerPrice, setOfferPrice] = useState(station.price);
    const { colors } = useTheme();
    const [user, setUser] = useState(null);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            let t = session.getParsed(keys.user);
            setUser(t);
        }

        return () => { isMounted = false };
    }, [isFocused]);

    const handleUpdatePrice = () => {
        if (station && station._id && user && user._id) {
            stationService.update(station._id, offerPrice, user._id)
                .then(result => {
                    if (result.error) {
                        alertError(result.error);
                        return;
                    }

                    setMenuVisibility(false);
                    setShowMakeOffer(false);
                    props.reload();
                });
        }
    }

    const handleDelete = () => {
        if (station && station._id && user && user._id) {
            alertConfirm({
                message: `You'll not be able to revert this.`,
                onConfirm: () => {
                    stationService.delete(station._id)
                        .then(result => {
                            if (result.error) {
                                alertError(result.error);
                                return;
                            }

                            setMenuVisibility(false);
                            props.reload();
                        });
                }
            });
        }
    }

    return (
        <>
            {
                showMakeOffer &&
                <Portal>
                    <Modal visible={showMakeOffer} onDismiss={() => setShowMakeOffer(false)}
                        contentContainerStyle={[localStyles.modal, { backgroundColor: colors.background, borderRadius: constants.POPUP_ROUNDNESS }]}>
                        <NumberInput
                            placeholder="Price"
                            value={offerPrice}
                            onChangeText={setOfferPrice}
                            icon="tag-outline"
                            style={localStyles.textInput}
                            autoFocus
                        />
                        <HelperText type="error" visible={!offerPrice || offerPrice.length === 0 || isNaN(offerPrice)} style={localStyles.errorHelper}>
                            Please provide a valid price.
                        </HelperText>
                        <View style={{ flexDirection: "row" }}>
                            <Button
                                text="Close"
                                style={localStyles.btnSubmit}
                                onPress={() => setShowMakeOffer(false)}
                                icon="window-close"
                            >
                            </Button>
                            <Button
                                text="Update"
                                style={localStyles.btnSubmit}
                                onPress={handleUpdatePrice}
                                icon="tag-outline"
                            >
                            </Button>
                        </View>
                        <Paragraph style={{ fontSize: 12, marginTop: 10 }}>Tap anywhere on screen to close the popup.</Paragraph>
                    </Modal>
                </Portal>
            }
            <Card style={localStyles.card}>
                <Card.Title
                    title={station.title}
                    subtitle={station.address}
                    right={props => (
                        <Menu
                            visible={menuVisiblility}
                            onDismiss={() => setMenuVisibility(false)}
                            anchor={<IconButton icon="dots-vertical" onPress={() => setMenuVisibility(true)}></IconButton>}>
                            <Menu.Item onPress={() => setShowMakeOffer(true)} title="Edit Price" />
                            {
                                user && user.status === "admin" &&
                                <Menu.Item onPress={handleDelete} title="Delete" />
                            }
                        </Menu>
                    )} />

                <Card.Content>
                    <View style={{ flexDirection: "row" }}>
                        <Title style={{ flex: 1 }}>
                            {`$${utils.formatToCurrency(station.price)}`}
                        </Title>
                        <Paragraph style={{ flex: 1, marginTop: 8 }}>
                            <MaterialCommunityIcons name="account-outline" size={20} color={colors.primary} />
                            {station.user.name}
                        </Paragraph>
                        <Paragraph style={{ flex: 1, marginTop: 8 }}>
                            <MaterialCommunityIcons name="clock-outline" size={20} color={colors.primary} />
                            {utils.dayMonthYearFormat(station.dateUpdated)}
                        </Paragraph>
                    </View>
                </Card.Content>
            </Card>
        </>
    );
}

export default StationRow;

const localStyles = StyleSheet.create({
    card: {
        marginTop: 10,
        width: windowWidth - 10,
        padding: 10,
    },
    modal: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
    },
    container: {
        flex: 1
    },
    scrollView: {
        ...globalStyles.scrollingContainer,
        paddingBottom: 30
    },
    errorHelper: {
        ...globalStyles.errorHelper
    },
    imageViwer: {
        flex: 1,
        height: 300,
        maxHeight: 300,
        minHeight: 300,
        width: "100%"
    },
    favourites: {
        fontSize: 16,
        marginRight: 5
    },
    btnSubmit: {
        ...globalStyles.btnPrimary,
        marginBottom: 5,
        flex: 1,
        margin: 3
    },
    textInput: {
        ...globalStyles.textInput,
        marginBottom: 5
    },
});