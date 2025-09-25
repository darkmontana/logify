'use server';

export async function login(username: string, password: string) {
    const auth_res = await fetch(
        "https://app.didattica.polito.it/api/auth/login",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "device": {
                    "name": "My PC",
                    "platform": "Web",
                    "version": "1.0",
                    "model": "PC",
                    "manufacturer": "Custom"
                },
                "client": {
                    "name": "students-app",
                    "buildNumber": "1",
                    "appVersion": "1.0.0",
                    "id": "12345",
                    "fcmRegistrationToken": "fake_fcm_token"
                }
            })
        }
    );
    if (auth_res.ok) {
        const token = (await auth_res.json()).data.token;
        const courses_res = await fetch(
            "https://app.didattica.polito.it/api/courses",
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            }
        );
        if (courses_res.ok && (await courses_res.json()).data.some((c: { shortcode: string; }) => c.shortcode == "01OGGPT")) {  // 02LSEOV
            const info_res = await fetch(
                "https://app.didattica.polito.it/api/me",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );
            if (info_res.ok) {
                const info = (await info_res.json()).data
                console.log(info);
                return {
                    validity: 1,
                    username: info.username,
                    firstName: info.firstName,
                    lastName: info.lastName,
                }
            } else return null;
        } else return null;
    } else return null;
}
