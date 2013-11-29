georeport [![Build Status](https://secure.travis-ci.org/stetro/georeport.png)](https://travis-ci.org/stetro/georeport.png)
=========


A Node.js json georeport v2 server based on express.

[http://wiki.open311.org/GeoReport_v2](http://wiki.open311.org/GeoReport_v2)

Status
------

* `/services` resource base finished
* `/requests` resource base finished

General constraints
-------------------
* Encoding is `UTF-8`
* Time is coded in `ISO 8601`
* Possible formats:  `text/xml; charset=utf-8` or `application/json; charset=utf-8`
* HTTP header codes for error handling (`40*` and `50*`)

Services
--------
> `GET` https://[endpoint]/services.[format]

	* provide the request types like “snow on the road” or “defect street light”
	* with service_code, service_name, description …

> `GET` https://[endpoint]/services/[service_code].[format]

	* provide further metadata for the request types like “10cm snow” and “5cm snow”

> `POST` https://[endpoint]/requests.[format]

	* create a new service request with service_code location and attributes
	* respond a unique service_request_id and service_notice for feedback
	* Image can be send via media_url (second upload service necessary!)

> `GET` https://[endpoint]/requests.[format]

	* query the current status of multiple requests

> `GET` https://[endpoint]/requests/[service_request_id].[format]

	* query the current status of a single request
