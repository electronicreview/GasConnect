import React from 'react';
import { useTheme } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

// loading component, it will show up when screen loads
function Loading() {
	const { colors } = useTheme();
    return (
        <Spinner
            visible={true}
            size="large"
            color={colors.primary}
        />
    );
}

export default Loading;