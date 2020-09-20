import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {useTheme} from "../theme/ThemeContext";
import PropTypes from 'prop-types';

const Typography = ({ children, variant = "body", style, color = 'text'}) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const colorStyle = ["textSecondary", "text", "white"].includes(color) ? theme.palette[color] : theme.palette[color].main;
  return (
      <Text style={[styles.root, styles[variant], { color: colorStyle },  style]}>
        {children}
      </Text>
  )
};

Typography.propTypes = {
  variant: PropTypes.oneOf(['title', 'subtitle', 'body', 'caption']),
  color: PropTypes.oneOf(['primary','accent','info','success','error', 'textSecondary', 'text', 'white' ])
}
const makeStyles = theme => StyleSheet.create({
  root: {
    fontFamily: 'AvenirNextLTPro-Regular',
  },

  title: {
    fontFamily: 'AvenirNextLTPro-Bold',
    fontSize: 28,

  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'AvenirNextLTPro-Demi',

  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 12,
  },

})

export default Typography;
