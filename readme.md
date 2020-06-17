# rockyjreed.com Site

This repo holds the code for the static site rockyjreed.com.

The current architecture of the application is:

- NodeJS / Express / RethinkDB server application
- Amazon S3 storage for content 
- Github repo/Github pages for static front-end application (this repo)
- Big Cartel for a storefront / ecommerce application

The node server serves an admin panel web app and handles queries to create/read/update/delete dynamic content (such as an artwork listing or blog post), and distributes content to an AWS S3 bucket.

The static site requests content (JSON files, images, etc) from the S3 bucket storage and displays it programmaticly. 



All the code in this repo is open source and may be used freely for any application. It is commented and unminified for ease of use.

The content (images / artwork, blog posts, etc.) is copyright Rocky Reed 2020 unless otherwise indicated.
