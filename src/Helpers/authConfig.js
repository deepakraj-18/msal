// authConfig.js
export const msalConfig = {
    auth: {
        clientId: "8570ed4a-ec51-4081-a74c-d3597c42d15f",
        authority: 'https://login.microsoftonline.com/3e8e53be-a48f-4147-adf8-7e90a6e46b57',
        redirectUri: 'http://localhost:3000'
    }
};

export const loginRequest = {
    scopes: ["User.Read"]
};
