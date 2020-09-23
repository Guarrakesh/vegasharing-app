import React from 'react';
import { TouchableOpacity } from 'react-native';
import {useTheme} from "../theme/ThemeContext";
import { StyleSheet } from 'react-native';

export function IconButton({ style, ...otherProps}) {
  const theme = useTheme();
  const styles = makeStyles();
  // const { style, lightColor, darkColor, icon, children, ...otherProps } = props;
  // const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');
  // const color = useThemeColor({ light: lightColor, dark: darkColor }, 'contrast');
  return (
      <TouchableOpacity style={[{ backgroundColor: theme.palette.primary.main }, styles.root, style ]} {...otherProps}>
        {React.cloneElement(icon, {
              color,
              size: 24,
            }
        )}
      </TouchableOpacity>
  )
}


const makeStyles = StyleSheet.create({
  root: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  }
});
