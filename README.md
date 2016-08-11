# FakeSportsRealMoney
## For league commissioners to avoid having to deal with deabeat members
### Create League
 * Submit a POST request to: `https://fake-sports-real-money.herokuapp.com/api/league/` that includes `"name": "YOURLEAGUENAME"` in the request body
## POST your league members information
 * Use your returned leagueId to POST reqeust to `https://fake-sports-real-money.herokuapp.com/api/league/YOURLEAGUEID/user/` that includes the following info in the request body:
 * * "`name: person's name`,
 * * `"contact{ "email" : "email@address.com", "phone":"5555555555"`


* The application will run a check everyday at 3:30 PM PST
* * If user is overdue, it will send them both an email and a text message reminding them that they're overdue
* If a member is overdue for more than 5 days, they will being to receive both and email and text as 4:30 AM PST everyday

## To mark a member as paid, submit a GET to
* `https://fake-sports-real-money.herokuapp.com/api/league/YOURLEAGUEID/user/`
* Find the user who has paid and submit a PUT request to
* * `https://fake-sports-real-money.herokuapp.com/api/league/YOURLEAGUEID/user/._id`  with the following request body
* * * `"overdue": false"`
