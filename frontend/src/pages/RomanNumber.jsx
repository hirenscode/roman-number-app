import { View } from '@adobe/react-spectrum';
import {Provider, defaultTheme} from "@adobe/react-spectrum";
import FormContent from '../components/FormContent.jsx';
import Header from '../components/Header.jsx';
import { useColorScheme } from '../contexts/ColorSchemeContext.jsx'

export default function RomanNumber() {
  const { colorScheme } = useColorScheme();

  return (
    <Provider theme={defaultTheme} colorScheme={colorScheme}>
      <View padding="size-200">
        <Header/>
        <FormContent/>
      </View>
    </Provider>
  );
}