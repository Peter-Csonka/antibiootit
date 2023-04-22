# Frontend - Antibiootit

## Requirements

- Node.js 16.16.0
- npm 9.2.0

https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

## Run in development mode

This section describes how to run the frontend locally. The development server consumes more resources, but provides more functionalities for development.
### Environment

The development mode uses production (Railway) backend server for API calls. It requires valid `API-KEY` for the calls. Here are instructions how to set it up.

`.env` file is required in the root directory. The content should be:

```
REACT_APP_API_KEY=<API-KEY>
```
The value for `<API-KEY>` should be the same as hosting service's backend server's `apikey` environment variable. It can be found from Railway.

### Running the program

To run the app in the development mode, enter the following commands in the root directory:

```
npm install
npm run dev
```
Open http://localhost:3000 to view it in your browser.

## Run in production mode

This section describes how to run the program in production mode with optimized server and less memory consumption.

### Environment
In production mode, `PORT` environment variable needs to be set. Railway hosting service provides this automatically.

`REACT_APP_API_KEY` environment variable needs to be set. It must match Railway's backend server's `apikey` environment variable. 

### Running the program
To run the app in production mode, enter the following commands in the root directory:
```
npm run build
npm run start
```

## Deploying to Railway
CI/CD-pipeline has been set up to deploy changes in `main` branch automatically to Railway. It automatically fetches the codes, builds the new production server and deploys it automatically. Deployed application is reachable from [antibiootit.fi](antibiootit.fi) or [via Railway's domain](frontend-production-a67f.up.railway.app)
