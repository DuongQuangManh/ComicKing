import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';


export async function requestUserPermission() {
    if (Platform.OS == "ios") {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }
}
export function getFirebaseToken() {
    // const isIos = Platform.OS === "ios";
    // const isGoogleSupport = isIos ? true : DeviceInfo.hasGmsSync();
    // if (!isGoogleSupport) {
    //     return ''; // If not supported , we don't have get FCM Tokens
    // }

    return new Promise((resolve, reject) => {
        messaging().getToken()
            .then(token => {
                resolve(token)
            })
            .catch(err => {
                reject(err);
            })
    })
}

export function handleFirebaseNotification(callBackWhenReceivceNotification, callBackNotificationClick) {
    // const isIos = Platform.OS === "ios";
    // const isGoogleSupport = isIos ? true : DeviceInfo.hasGmsSync();
    // if (!isGoogleSupport) {
    //     return;
    // }

    messaging().getInitialNotification()
        .then(x => {
            console.log("INIT NOTIFICATION ", callBackNotificationClick(x?.data));
        })
        .catch(er => {
            console.log(er);
        })
    messaging().onNotificationOpenedApp(notification => {
        try {
            console.log('onNotificationOpenedApp ', notification)
            callBackNotificationClick(notification.data)
        } catch (error) {
            console.log(error);
        }
    })
    messaging().onMessage(e => {
        callBackWhenReceivceNotification(e?.data)
        console.log('OnMessage : ', e)
        const { notification, data } = e || {}

        PushNotification.localNotification({
            channelId: "momoney-notification",
            message: notification.body,
            title: notification.title,
            color: "green",
            smallIcon: "ic_launcher",
            largeIcon: "ic_launcher",
            playSound: true,
            userInfo: data
        })
    })
}

export function setupPushLocalNotification(callBackNotificationClick) {
    PushNotification.configure({
        onRegister: function (token) {
        },
        onNotification: function (notification) {
            console.log("onNotification NOTIFICATION:", notification);
            if (!notification.foreground) return
            try {
                callBackNotificationClick(notification?.data)
            } catch (error) {
                console.log(error);
            }
        },
        onAction: function (notification) {
            console.log("onAction ACTION:", notification.action);
            console.log("onAction NOTIFICATION:", notification);
        },
        onRegistrationError: function (err) {
            console.error(err.message, err);
        },

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
    });
    PushNotification.createChannel(
        {
            channelId: "momoney-notification", // (required)
            channelName: "Default", // (required)
            channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            playSound: true, // (optional) default: true
            soundName: "sound_noti.wav", // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.

        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );

}
