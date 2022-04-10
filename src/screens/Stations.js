
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    RefreshControl,
    FlatList
} from 'react-native';
import keys from "../store/keys";
import { Text, HelperText, Avatar } from "react-native-paper";
import session from "../store/session";
import globalStyles from "../styles/style";
import { windowWidth } from "../utils/dimensions";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import stationService from "../services/station";
import StationRow from "../components/StationRow";
import {alertError} from "../utils/alerts";

function Stations(props) {

    const navigation = useNavigation(); 
    const isFocused = useIsFocused();
    const [stations, setStations] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            reload();
        }

        return () => { isMounted = false };
    }, [isFocused]);

    const reload = () => {
        stationService.getAll(``)
            .then(result => {
                if (result.error) {
                    alertError(result.error);
                    return;
                }
                
                setStations(result.data);
            });
    }

    const onRefresh = () => {
        setRefreshing(true);
        reload();
        setRefreshing(false);
    }

    const renderStations = () => {
        if (stations.length === 0)
            return <Text>No data found.</Text>;

        return <FlatList
            data={stations}
            renderItem={item => <StationRow key={item._id} data={item} reload={reload} />}
            keyExtractor={item => item._id}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
    }

    return (
        <View style={localStyles.container}>
            {renderStations()}
        </View>
    );
}

export default Stations;

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
        marginBottom: 30
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