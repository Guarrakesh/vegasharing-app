import  React from 'react';
import { TouchableOpacity } from 'react-native';
import {useTheme} from "../theme/ThemeContext";
import { StyleSheet } from 'react-native';

export function IconButton({ icon, style, ...otherProps}) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  // const { style, lightColor, darkColor, icon, children, ...otherProps } = props;
  // const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');
  // const color = useThemeColor({ light: lightColor, dark: darkColor }, 'contrast');
  return (
      <TouchableOpacity style={[ styles.root, style ]} {...otherProps}>
        {React.cloneElement(icon, {
              size: 24,
            }
        )}
      </TouchableOpacity>
  )
}


const makeStyles = theme => StyleSheet.create({
  root: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  }
});
