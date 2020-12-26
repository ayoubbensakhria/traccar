## Theaming
ThemeProvider component is used in order to inject a theme into the application. However, this is optional; Material-UI components come with a default theme.

ThemeProvider relies on the context feature of React to pass the theme down to the components, so you need to make sure that ThemeProvider is a parent of the components you are trying to customize. You can learn more about this in the API section.
To run the project in development mode:

- Make sure you have Geontrack backend running.
- Install dependencies using `npm install` command
- Run development server using `npm start` command

To change the backend server URL:

- Copy the content of the .env to .env.local (new file)
- Change REACT_APP_URL_NAME to your backend URL. Example: 'example.com:8081'

Project was created using [Create React App](https://github.com/facebook/create-react-app). For more information see [user guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md).
