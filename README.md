# OMDb-Explorer
A simple react native app to explore OMDb listings

- A Video walkthrough of the app is available on YouTube: [https://youtu.be/LQ9zWkWL-rA](https://youtu.be/LQ9zWkWL-rA)
- Used [expo](https://expo.io) to set up a managed workflow for the app.
- The only third external library used, apart from the ones included by expo, is:
  - [axios](https://www.npmjs.com/package/axios): Decided to use axios when faced with pluggable parameters in the GET requests to the REST API.

The UI for the app was inspired from the IMDb app on iOS. It was simplified a lot to meet the requirement and time constraints.

__Development Decisions:__
- Stack Navigator used due to the `[Show] -> [Detail, [Episode List]]` hierarchy.
- `Axios` used for networking due to its simple integration and ability to dynamiaclly add parameters to `GET` request.
- Separate Card components for shows, and episode details.
- Project can be built using the `expo build` command as documented [here](https://docs.expo.io/versions/latest/distribution/building-standalone-apps/)
- In the present state, development mode, the project can be run as follows:
  - Install `Expo` from App Store / Play Store on Device
  - From terminal:
    - `yarn install` to install the dependencies.
    - `yarn start` to start development server
    - On Android:
      - Scan QR you see in above step in Expo app.
    - On iOS:
      - Scan QR code you see in above step in the iPhone Camera app.
- An Android build of the app is also available on the following link as an `APK`: [https://expo.io/artifacts/f1324258-76d8-450d-a26c-b6f390c4adc8](https://expo.io/artifacts/f1324258-76d8-450d-a26c-b6f390c4adc8)
