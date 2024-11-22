import { StyleSheet, View, Text } from "react-native";
import { Button, Card, IconButton } from "react-native-paper";
import { FC } from "react";

export interface ILargeCard {
  title: string;
  children: JSX.Element;
  rightIcon: string;
  handleClick: () => void;
}
const LargeCard: FC<ILargeCard> = (props) => {
  return (
    <Card style={styles.root}>
      <Card.Content>
        <View style={styles.content}>
          <Text>{props.title}</Text>
          <IconButton
            icon={props.rightIcon}
            iconColor={"gray"}
            size={22}
            onPress={props.handleClick}
          />
        </View>
        {props.children}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    marginVertical: 5,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default LargeCard;
