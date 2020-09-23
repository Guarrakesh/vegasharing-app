import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';

const fontMap = {
  'avenir-next-lt-pro-bold': require('../../assets/fonts/avenir-next-pro/AvenirNextLTPro-Bold.otf'),
  'avenir-next-lt-pro-demi': require('../../assets/fonts/avenir-next-pro/AvenirNextLTPro-Demi.otf'),
  'avenir-next-lt-pro-it': require('../../assets/fonts/avenir-next-pro/AvenirNextLTPro-It.otf'),
  'avenir-next-lt-pro-regular': require('../../assets/fonts/avenir-next-pro/AvenirNextLTPro-Regular.otf'),
  'avenir-next-lt-pro-demi-cn': require('../../assets/fonts/avenir-next-pro/AvenirNextLTPro-DemiCn.otf'),
  'avenir-next-lt-pro-bold-cn': require('../../assets/fonts/avenir-next-pro/AvenirNextLTPro-BoldCn.otf'),

};

export default () => {
  let [fontsLoaded, error] = useFonts(fontMap);
  return [fontsLoaded, error];

}
