import React from 'react';
import { useFonts } from 'expo-font';

export default () => {
  let [fontsLoaded] = useFonts({
    'AvenirNextLTPro-Bold': require('../../assets/fonts/avenir-next-pro/AvenirNextLTPro-Bold.otf'),
    'AvenirNextLTPro-Demi': require('../../assets/fonts/avenir-next-pro/AvenirNextLTPro-Demi.otf'),
    'AvenirNextLTPro-It': require('../../assets/fonts/avenir-next-pro/AvenirNextLTPro-It.otf'),
    'AvenirNextLTPro-Regular': require('../../assets/fonts/avenir-next-pro/AvenirNextLTPro-Regular.otf'),
    'AvenirNextLTPro-DemiCn': require('../../assets/fonts/avenir-next-pro/AvenirNextLTPro-DemiCn.otf'),
    'AvenirNextLTPro-BoldCn': require('../../assets/fonts/avenir-next-pro/AvenirNextLTPro-BoldCn.otf'),

  });

  return [fontsLoaded];
}
