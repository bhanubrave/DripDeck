import React from 'react';
import { View, Text, ViewStyle } from 'react-native';

type DripCardProps = {
    name: string;
    roastLine: string;
    style?: ViewStyle;
};

const DripCard = ({ name, roastLine, style }: DripCardProps) => {
    return (
        <View className="bg-white p-4 rounded-2xl shadow-lg w-full" style={style}>
            <Text className="text-black text-xl font-bold text-center">{name}</Text>
            <Text className="text-red-500 mt-2 text-center italic">"{roastLine}"</Text>
        </View>
    );
};

export default DripCard;
