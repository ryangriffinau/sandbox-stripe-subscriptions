
https://www.netlify.com/blog/2020/07/13/manage-subscriptions-and-protect-content-with-stripe/

ryan@instrand.co
testing

## Netlify

<!-- link local site to Netlify site -->
ntl link

<!-- launch a local dev server to review changes on  -->
ntl dev

When want to test out live updates:
1. commit git changes -> git add . -> git commit -m "msg"
2. npm run build

## Fauna
### Set up
Used to set up a simple db
1. set up gql schema -> db/schema
2. create new fauna db
3. upload schema to gql tab
4. Generate a server key -> Security -> New Key
    - Role: Server -> allows read/write
    Secret:
    fnAEBj7p1MACARh69YCi6zVnUKcezY6D8mL9QFGo
5. Netlify -> Site Settings -> Build & Deploy -> Environment -> Edit Variables
    key: FAUNA_SERVER_KEY
    value: {Secret}
6. make sure node-fetch is installed in package
7. Create fauna utility function -> functions/utils/fauna.js

## Stripe
Always set up in test mode, can always Copy to Live Mode
1. create products required -> copy API ID: price_xxx
Free: price_1IIfvjCjVSJMhXRIcovIQ4q2
Pro:
- monthly: price_1IIg0OCjVSJMhXRIGh0xklu6
- annual: price_1IIg0OCjVSJMhXRIJ3udvJtu
Premuim: 
- monthly: price_1IIg1VCjVSJMhXRIORmDUikd
- annual: price_1IIg1VCjVSJMhXRIaybpJY38

2. Add 2 new environment variables in Netlify:
- STRIPE_DEFAULT_PRICE_PLAN, which contains the API ID for the Free plan
- STRIPE_SECRET_KEY, which contains Stripe secret key
3. npm install stripe
4. create handler to auto create new customer with each sign up

## Test Environ

To replicate user login, use sign up link, verify email and then collect value of confirmation token
https://frosty-franklin-b3f0c5.netlify.app/#confirmation_token=wuZJVaQE-QPJf-KQEUbEeQ

Then add as hash to localhost
http://localhost:8888/#confirmation_token=wuZJVaQE-QPJf-KQEUbEeQ
If it works, you'll be presented with a Logged In screen

user: ryan@instra
pass: testing