import React, { useRef, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'react-native-share';
import DripCard from '../../components/DripCard';
import { generateRoastPrompt } from './roastPromt';
import { ChatCompletionResponse } from '@/types/openai';

const RoastScreen = () => {
    const [name, setName] = useState('');
    const [roast, setRoast] = useState('');
    const [loading, setLoading] = useState(false);
    const cardRef = useRef<View>(null);

    const fetchRoast = async () => {
        if (!name.trim()) return;
        setLoading(true);

        const prompt = generateRoastPrompt(name, 'savage');

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: prompt }],
                }),
            });

            const data: ChatCompletionResponse = await response.json();
            const roastLine = data.choices?.[0]?.message?.content?.trim() ?? '';
            setRoast(roastLine);
        } catch (error) {
            console.error('Roast error:', error);
        } finally {
            setLoading(false);
        }
    };

    const shareRoast = async () => {
        if (!cardRef.current) return;

        try {
            const uri = await captureRef(cardRef, {
                format: 'png',
                quality: 1,
            });

            await Sharing.shareAsync(uri);
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <View className="flex-1 bg-black px-4 justify-center">
            <Text className="text-white text-2xl mb-4 font-bold">🔥 Roast Me</Text>

            <TextInput
                placeholder="Enter your name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
                className="border border-gray-600 text-white rounded-lg p-3 mb-4"
            />

            <TouchableOpacity
                onPress={fetchRoast}
                disabled={loading}
                className="bg-red-500 py-3 rounded-xl mb-6"
            >
                <Text className="text-center text-white font-semibold">
                    {loading ? 'Generating...' : 'Get Roasted'}
                </Text>
            </TouchableOpacity>

            {roast !== '' && (
                <>
                    <View ref={cardRef} collapsable={false}>
                        <DripCard name={name} roastLine={roast} />
                    </View>

                    <TouchableOpacity
                        onPress={shareRoast}
                        className="bg-white mt-6 py-3 rounded-xl"
                    >
                        <Text className="text-center text-black font-bold">📤 Share This Roast</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default RoastScreen;
