// Profile.js
import React from 'react';
import { useMsal } from '@azure/msal-react';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { loginRequest } from '../../Helpers/authConfig';
const Profile = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = React.useState(null);

    React.useEffect(() => {
        if (accounts.length > 0) {
            const request = {
                ...loginRequest,
                account: accounts[0]
            };

            instance.acquireTokenSilent(request).then(response => {
                fetch('https://graph.microsoft.com/v1.0/me', {
                    headers: {
                        Authorization: `Bearer ${response.accessToken}`
                    }
                })
                    .then(res => res.json())
                    .then(data => setGraphData(data))
                    .catch(err => {
                        if (err instanceof InteractionRequiredAuthError) {
                            instance.acquireTokenPopup(request).then(response => {
                                fetch('https://graph.microsoft.com/v1.0/me', {
                                    headers: {
                                        Authorization: `Bearer ${response.accessToken}`
                                    }
                                })
                                    .then(res => res.json())
                                    .then(data => setGraphData(data));
                            });
                        }
                    });
            });
        }
    }, [accounts, instance]);

    return (
        <div>
            {graphData ? (
                <pre>{JSON.stringify(graphData, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
