# Polibatam-ReactNative
### Get Started
First you need to install all dependencies by running :
```bash
yarn install
```

### Add Firebase to project
Follow this [guide](https://firebase.google.com/docs/android/setup#add_firebase_to_your_app)

Note: You can skip step 4

### Running on local server

Go open file in src > redux > actions > index.js, and edit the following line. And change it with your own local server

```javascript
const api = 'https://polibatam-api.herokuapp.com';
```

to

```javascript
const api = 'your own server ip';

const api = 'http://192.168.43.197:3000'; // example
```

### Build The Application

Before build the release version of the application, please follow this documentation to [Signed APK](https://facebook.github.io/react-native/docs/signed-apk-android)

To build the project just simply run this command on terminal

```sh
yarn build-android
```

or this command to debug the application

```sh
yarn start-android
```

### Server

Clone this [Polibatam-Server](https://github.com/reynandapp1997/Polibatam-Server) repository for the server of this application. 
