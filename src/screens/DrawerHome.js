import React, {useEffect, useState} from "react";
import { createDrawerNavigator, useDrawerStatus } from '@react-navigation/drawer';
import DrawerContent from "../components/DrawerContent";
import Profile from './Profile';
import Stations from "./Stations";
import Station from "./Station";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from "react-native-paper";
import session from "../store/session";
import keys from "../store/keys";
import { useNavigation } from '@react-navigation/native';
import BackButton from "../components/BackButton";

const Drawer = createDrawerNavigator();

function DrawerHome(props) {

	const {colors} = useTheme();
    const navigation = useNavigation();

	return (
		//Side navigation bar which shows options such as profile, and stations.
		<Drawer.Navigator
			drawerContent={props => <DrawerContent {...props} />}
			screenOptions={ ({navigation}) => ({
				title: "Gas Connect",
				headerShown: true,
				headerLeft: props => {
						return (
							<MaterialCommunityIcons name="menu" size={25} color={colors.primary} 
								style={{ marginHorizontal: 20}} onPress={() => navigation.toggleDrawer()} />
						);
				}
			})}>
			<Drawer.Screen 
				name="Stations" 
				component={Stations}
			/>
			<Drawer.Screen 
				name="Profile" 
				component={Profile}
				options={{
					title: "My Profile",
					headerLeft: props => <BackButton />
				}}
			/>
			//This section is only displayed to admins		
			<Drawer.Screen 
				name="Station" 
				component={Station}
				options={{
					title: "Add Station",
					headerLeft: props => <BackButton />
				}}
			/>
		</Drawer.Navigator>
	);
}

export default DrawerHome;
