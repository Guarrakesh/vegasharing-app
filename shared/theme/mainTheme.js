import shadows from "./shadows";

const fonts = {
  AvenirNextPro: {
    bold: "avenir-next-lt-pro-bold",
    demi: "avenir-next-lt-pro-demi",
    itali: "avenir-next-lt-pro-it",
    regular: "avenir-next-lt-pro-regular",
    demiCn: "avenir-next-lt-pro-demi-cn",
    boldCn: "avenir-next-lt-pro-bold-cn"
  }
}
export default {
  mode: 'light',
  palette: {
    primary: {
      main: "#F35729",
      dark: "#B83A15",
      light: "#F5663C"
    },
    accent: {
      main: "#6E71E6",
      dark: "#474ABA",
      light: "#A7A9FF"
    },
    error: {
      main: "#EA2027",
      dark: "#C01218",
      light: "#EB4046"
    },
    info: {
      main: "#007AFF",
      dark: "#007AFF",
      light: "#48A0FF",
    },
    success: {
      main: "#00C554",
      dark: "#0D9045",
      light: "#0EEB6C"
    },
    white: "#fff",
    text: "#1f1f1f",
    textSecondary: "#6e6e6e"
  },
  elevation: {
    ...shadows
  },

  backgroundColor: '#f8f8f8',
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 16,
    fontSize: 16,
    label: {
      fontFamily: fonts.AvenirNextPro.regular,
      fontWeight: '600',
      color: '#444',
      fontSize: 15,
      marginBottom: 4,
      textAlign: 'left',
    }
  },
  card: {
    borderRadius: 12
  },

  borders: {
    color: '#dfdfdf',
    borderRadius1: 4,
    borderRadius2: 8,
    borderRadius3: 12
  },
  fonts
}
