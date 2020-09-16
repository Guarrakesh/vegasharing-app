import shadows from "./shadows";

export default {

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
    white: "#fff",
    text: "#444",
  },
  elevation: {
    ...shadows
  },

  backgroundColor: '#efefef',
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 16,
    label: {
      fontWeight: '600',
      color: '#444',
      fontSize: 15,
      marginBottom: 4,
      textAlign: 'left',
    }
  },
  card: {
    borderRadius: 25
  },

  borders: {
    color: '#dfdfdf',
    borderRadius1: 4,
    borderRadius2: 8,
    borderRadius3: 12
  }
}
