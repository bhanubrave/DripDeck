import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RoastScreen from '../features/RoastMe/RoastScreen';

export type RootStackParamList = {
    RoastMe: undefined;
    // MemeStudio: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="RoastMe"
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="RoastMe" component={RoastScreen} />
            {/* <Stack.Screen name="MemeStudio" component={MemeScreen} /> */}
        </Stack.Navigator>
    );
};

export default MainNavigator;
