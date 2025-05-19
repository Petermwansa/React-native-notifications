import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

// Setup notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log('NOTIFICATION RECEIVED');
      console.log(notification);
      const userName = notification.request.content.data.userName;
      console.log(userName);
    });

    const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('NOTIFICATION RESPONSE RECEIVED');
      console.log(response);
      const userName = response.notification.request.content.data.userName;
      console.log("The response came from: " + userName);
      
    })

    return () => {
      subscription.remove();
      subscription2.remove();
    }
  }, [])



  const scheduleNotificationHandler = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'First Local Notification',
        body: "The content of the notification",
        data: { userName: "Peter" },
      },
      trigger: { seconds: 10 },
    });
  };

  return (
    <View style={styles.container}>
      <Button title='Schedule a Notification' onPress={scheduleNotificationHandler} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
