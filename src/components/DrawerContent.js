import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
    useTheme
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import session from '../store/session';
import {alertConfirm} from "../utils/alerts";
import constants from '../utils/constants';
import keys from "../store/keys";
import { useIsFocused } from "@react-navigation/native";

function DrawerContent({ navigation, ...props }) {

	const { colors } = useTheme();
    const isFocused = useIsFocused();
    const [user, setUser] = useState(null);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            let t = session.getParsed(keys.user);
            setUser(t);
        }

        return () => { isMounted = false };
    }, [isFocused]);

    const onLogout = () => {
        alertConfirm({
            message: "",
            onConfirm: () => {                
                session.logout();
                navigation.navigate("Login");
            }
        });
    }

    if(!user)
        return null;
    
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{user.name}</Title>
                                <Caption style={styles.caption}>{user.email}</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Stations"
                            onPress={() => navigation.navigate('Stations')}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="account-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="My Profile"
                            onPress={() => navigation.navigate('Profile')}
                        />
                        {
                            user && user.status === "admin" &&
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="store-plus-outline"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Add Station"
                                onPress={() => navigation.navigate('Station')}
                            />
                        }
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>

            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Logout"
                    onPress={onLogout}
                />
            </Drawer.Section>
        </View>
    );
}

export default DrawerContent;

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 0,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 2
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
