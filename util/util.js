import { Text } from "react-native";

export const LongText = ({ text, textLength, maxLength, style }) => {
  console.log("textLength:", textLength, "||||| maxLength:", maxLength);
  return (
    <>
      {textLength > maxLength ? (
        <Text style={style}>
          <Text>{text.slice(0, maxLength)}</Text>
          <Text>{"... "}</Text>
        </Text>
      ) : (
        <Text style={style}>{text}</Text>
      )}
    </>
  );
};
