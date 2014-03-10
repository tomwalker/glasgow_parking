# Live Glasgow parking data

Practice app that makes use of JSON feed from [http://data.glasgow.gov.uk/dataset/glasgow-car-parks-feed] to display live parking data of Glasgow City Council car parks on a streetmap.

Built with AngularJS. Runs a Nodejs server to pull that feed and passes it along to the controller via a service - could not figure out why I could not pull the feed directly into the service (could be a CORS problems).

Running at [http://desolate-lowlands-9828.herokuapp.com/]