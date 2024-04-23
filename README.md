# What is Gradient?

Gradient is a fitness analytics platform to help you shape and quantify your fitness goals and achievments.

# Why build it?

I personally wanted to use a fitness analytics platform, but I kept running into 2 main issues. Firstly, most fitness analytics platforms don't share or quantify the data that's actually important to measure progress. Secondly, they're REALLY expensive.

I wanted to build a free ( - hosting costs) option for myself that offers what I want compared to market analytics tools. Gradient is friendly to new users and approachable, but it's true strength lies with intermediate to advanced lifters or exercise professionals who can best plan and adapt exercise strategies based on the app.

I worked in collaboration with personal trainers, and performed a great deal of exercise science research, diving deep into published papers to find the best information to share with the end users. The end result, is Gradient.

# Tooling?

I chose to use SQL for this project, as it lends itself well to the intricately related datapoints. The full stack is React.js, Express.js, Typescript, Chart.js, Framer Motion, Tailwind, Passport.js, PostgreSQL, and Prisma. Prisma was selected, rather than raw SQL to ensure typesafety from the server to the client. Gradient is hosted on a DigitalOcean app for easier resource allocation if it grows larger.

Currently Gradient exists as an MVP, with plans to improve the UI, new user experience, and general performance as well as expanding the exercises available to pick from.

# I want to run it locally

You got it. First things first, I'm not sharing sensititve env variables, so you'll have to use the production server, but you can run the client locally.

Open up your editor of choice, fork and clone the repo to your local machine.

`1. git clone` _yourFork_

Go ahead and `cd` into the top-level directory and,

`2. npm i`

After you've installed the dependencies, you'll need to create an env file so the client has access to the correct server address.
`3. touch .env`

And copy the server address to your env file:

`VITE_LOCAL_API_URL = https://gradientserverpostgressql-production.up.railway.app/`

`4. npx vite`

To start the client in your browser.
