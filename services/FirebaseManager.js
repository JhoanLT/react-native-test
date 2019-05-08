import React, {PureComponent} from 'react';
import firebase from 'react-native-firebase';

class FirebaseManeger extends PureComponent{

    componentDidMount(){
        this.checkpermission();
    }

    /**
     * This function allows to ask for permission to firebase.
     *
     * @memberof FirebaseManager
     */
    async checkpermission() {
        const enabled = await firebase.messaging().hasPermission();
        if(enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    /**
     * This function request permissions to the firebase messaging cloud.
     *
     * @memberof FirebaseManager
     */
    async requestPermission() {
        try {
            await firebase.messaging.requestPermission();
            this.getToken();
        } catch(err) { 
            console.log("Error: ", err);
        }
    }

    /**
     * This function validates and stores the firebase messaging cloud.
     *
     * @memberof FirebaseManager
     */
    async getToken() {
        try {
            const fcmToken = await firebase.messaging().getToken();
            if(fcmToken) {
                console.log('FCMTOKEN : ', fcmToken);
            } else {
                this.printMessage("Cannot get the token");
            }
        } catch (error) {
            addMessage("Ocurrió un error al almacenar el token");
            consoleError(error);
        }
    }

    render(){
        return null;
    }
}

export default FirebaseManeger;