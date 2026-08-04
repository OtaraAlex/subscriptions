import { View, Text } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

const SubscriptionDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>Subscription Details: {id} </Text>
      <Link href={{ pathname: "/subscriptions" }}>Back to Subscriptions</Link>
    </View>
  );
};

export default SubscriptionDetails;
