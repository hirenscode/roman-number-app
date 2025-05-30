import React, { useEffect } from "react";
import { Flex, View, Button, Heading } from "@adobe/react-spectrum";
import { useColorScheme } from "../contexts/ColorSchemeContext.jsx";
import { trackComponentRender } from "../utils/observability";

export default function Header() {
    const {colorScheme, toggleColorScheme} = useColorScheme();

    useEffect(() => {
        trackComponentRender('Header', { colorScheme });
    }, [colorScheme]);

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