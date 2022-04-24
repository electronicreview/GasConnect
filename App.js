import 'react-native-gesture-handler';
import React, { useState, useEffect, Suspense } from 'react';
import { SafeAreaView, LogBox } from 'react-native';
import GlobalStyles from './src/styles/style';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import session from './src/store/session';
import Loading from './src/components/Loading';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import DrawerHome from "./src/screens/DrawerHome";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import keys from "./src/store/keys";
import { Provider as PaperProvider } from 'react-native-paper';

// ignore some unwanted development warning
LogBox.ignoreLogs(["Reanimated 2", "EventEmitter.removeListener"]);

const App = (props) => {

	// create stack navigator
	const Stack = createNativeStackNavigator();
	let [initialRoute, setInitialRoute] = useState(null);

	// check if the user is logged in,
	useEffect(() => {
		let isLoggedIn = session.get(keys.isLoggedIn) || null;
		if (isLoggedIn) {
			setInitialRoute("DrawerHome"); // if yes, set initial route to Drawer page
		}
		else {
			setInitialRoute("Login"); // if no, set initial route to Login page
		}
	}, []);

	return (
		<PaperProvider
			settings={{
				icon: props => <MaterialCommunityIcons {...props} />
			}}>
			<Suspense fallback={<Loading />}>
				{/* SafeAreaView to avoid content going over device notches */}
				<SafeAreaView style={GlobalStyles.safeArea}>
					{/* NavigationContainer to contain routes */}
					<NavigationContainer>
						{
							initialRoute && initialRoute === "Login" &&
							<Stack.Navigator initialRouteName="Login">
								<Stack.Screen name="Login" component={Login} options={{ header: () => null }}></Stack.Screen>
								<Stack.Screen name="Signup" component={Signup} options={{ header: () => null }}></Stack.Screen>
								<Stack.Screen name="DrawerHome" component={DrawerHome} options={{ header: () => null }}></Stack.Screen>
							</Stack.Navigator>
						}
						{
							initialRoute && initialRoute === "DrawerHome" &&
							<Stack.Navigator initialRouteName="DrawerHome">
								<Stack.Screen name="Login" component={Login} options={{ header: () => null }}></Stack.Screen>
								<Stack.Screen name="Signup" component={Signup} options={{ header: () => null }}></Stack.Screen>
								<Stack.Screen name="DrawerHome" component={DrawerHome} options={{ header: () => null }}></Stack.Screen>
							</Stack.Navigator>
						}
					</NavigationContainer>
				</SafeAreaView>
			</Suspense>
		</PaperProvider>
	);
};

export default App;
