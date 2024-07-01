**Running locally**

Frontend application requires NodeJs (preferrably v20).

Before starting, an `.env` file should be added in the root folder with the following lines:

```.env
REACT_APP_BASE_API_URL=http://localhost:80/api
```

The port `:80` should match the Apache `VirtualHost` setup (see below).

Now, run the following commands inside the `/frontend` directory:

```sh
npm install
npm start
```

Backend application requires XAMPP Version: 8.2.12 and PHP version 8. It requires setting up a VirtualHost in Apache by adding the following lines in the file located at `"C:\xampp\apache\conf\extra\httpd-vhosts.conf"` for the default XAMPP installation location. Be careful to update `DocumentRoot path/to/public/folder` so it points to the location of `backend/public` folder of this repository:

```Apache
<VirtualHost *:80>
        ServerAdmin root@localhost
        DocumentRoot "path/to/public/folder"
        ErrorLog "C:/code/adriatic-booking-test/backend/logs/test.dev_error_log"
        CustomLog "C:/code/adriatic-booking-test/backend/logs/test.dev_access_log" common

        <Directory "C:/code/adriatic-booking-test/backend/public">
	        AllowOverride All
	        Require all granted
        </Directory>
</VirtualHost>
```

The port after `VirtualHost` should be the port where Apache is listening on.
After updating `httpd-vhosts.conf`, restart Apache.

Open `http://localhost:3000` in a browser - the React app should be served here.
