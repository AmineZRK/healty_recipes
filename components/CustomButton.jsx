import { Pressable, StyleSheet, Text } from 'react-native';

export default function CustomButton(props) {
  return (
    <Pressable
      onPress={props.onPress}
      style={() =>
        props.outline
          ? [styles.button, styles.outline]
          : styles.button
      }>
      <Text style={styles.textButton}>{props.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFBD59',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFBD59',
  },
  textButton: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
});
