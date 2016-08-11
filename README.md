# FakeSportsRealMoney
## For league commissioners to avoid having to deal with deadbeat members
### Create League
 * Submit a POST request to: `https://fake-sports-real-money.herokuapp.com/api/league/` that includes `"name": "YOURLEAGUENAME"` in the request body and "sport" attribute if desired, FSRM league creation defaults to Football if left unspecified

## POST your league members information
 * Use your returned leagueId to POST reqeust to `https://fake-sports-real-money.herokuapp.com/api/league/YOURLEAGUEID/user/` that includes the following info in the request body:
 *  `name: person's name` (required field),
 *  `contact: { "email":"email@address.com", "phone":"5555555555"}` (required fields),
 *  `overdue: true/false` (defaults to true if unspecified),
 *  `amountDue: 50` (optional)

Specific request field formatting depends on your method of input, we recommend httpie or postman if your not experienced with curl.
Example httpie from the terminal:
`http POST https://fake-sports-real-money.herokuapp.com/api/league/YourLeagueIDHere/user name="Example Name" contact.phone=5555555555 contact.email=example@email.com overdue=true amountDue=200`
To create the user and add them to your league.

* The application will run a check everyday at 3:30 PM PST
* * If user is overdue, it will send them both an email and a text message reminding them that they're overdue
* If a member is overdue for more than 5 days, they will being to receive both and email and text as 4:30 AM PST everyday

## To mark a member as paid, submit a GET to
* `https://fake-sports-real-money.herokuapp.com/api/league/YOURLEAGUEID/user/`
* Find the user who has paid and submit a PUT request to
* * `https://fake-sports-real-money.herokuapp.com/api/league/YOURLEAGUEID/user/paidUser._id`  with the following request body
* * * `"overdue": false`,
*     `"amountDue": 0`
