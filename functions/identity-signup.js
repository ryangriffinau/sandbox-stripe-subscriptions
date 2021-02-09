const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require('./utils/fauna');

// will be called whenver someone signs up to the site

exports.handler = async (event) => {
  const { user } = JSON.parse(event.body);
  console.log('in Handler');
  console.log(user);
  // create a new customer in Stripe using user info
  const customer = await stripe.customers.create({ email: user.email });
  // subscribe the new customer to the free plan
  await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: process.env.STRIPE_DEFAULT_PRICE_PLAN }],
  });
  console.log(`stripeID: ${customer.id}`);
  // store the Netlify and Stripe IDs in Fauna
  await faunaFetch({
    query: `
      mutation ($customerID: ID!, $netlifyID: ID!, $stripeID: ID!) {
        createUser(data: { customerID: $customerID, netlifyID: $netlifyID, stripeID: $stripeID }) {
          customerID
          netlifyID
          stripeID
        }
      }
    `,
    variables: {
      customerID: 1,
      netlifyID: user.id,
      stripeID: customer.id,
    },
  });
  console.log('passed fauna');
  return {
    statusCode: 200,
    body: JSON.stringify({
        // how able to control user roles
      app_metadata: {
        roles: ['free'],
      },
    }),
  };
};