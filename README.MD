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

        <Directory "path/to/public/folder">
	        AllowOverride All
	        Require all granted
        </Directory>
</VirtualHost>
```

The port after `VirtualHost` should be the port where Apache is listening on.

Last step is to add the following `.htaccess` file in the `backend/public` folder:

```Apache
Options -Indexes

RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . index.php [L]
```

After updating `httpd-vhosts.conf` and adding the above `.htaccess` file, start/restart Apache.

Open `http://localhost:3000` in a browser - the React app should be served here and fetching data from the PHP backend.
