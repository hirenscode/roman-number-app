import React from "react";
import { Flex, View, Button, Heading } from "@adobe/react-spectrum";
import { useColorScheme } from "../contexts/ColorSchemeContext.jsx";

export default function Header() {
    const {colorScheme, toggleColorScheme} = useColorScheme();

    return (
        <View backgroundColor="gray-200" padding="size-200">
            <Flex justifyContent="space-between" alignItems="center">
                <Heading level={3}> Convert to Roman </Heading>
                <Button variant="primary" onPress={toggleColorScheme}>
                    {colorScheme === 'dark' ? 'Light' : 'Dark'}
                </Button>
            </Flex>
        </View>

    );
}