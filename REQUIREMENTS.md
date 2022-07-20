
Requirements
We'll be evaluating your projects against the following hard requirements:

Your app must be a working, interactive, React application.
It must include data from a third-party API.
It must use at least 4 separate components.
It must be deployed to the Web.
It must be responsive across mobile, tablet, and desktop screens, and use CSS Flexbox or Grid for layout strategies (i.e., it is not dependent on floats or tables for layout concerns).
Your project repository must adequately document your project and include a link to the deployed app.
You must use Git for version control throughout the project.
If your project contains any navigation features, you must use React Router for them.

Requirements Criteria
We will determine whether or not you've met the requirements using the following criteria. The term may refers to optional criteria, while must or must not are not optional.

Your app must:

- Be a working, interactive, React application.
It must only use React for DOM manipulation.
It must not produce errors or console logs when used.
It must not display any non-functional actions (e.g., buttons or links that do not work).
It must not be dependent upon or cause the page to refresh (it must be an SPA).
It must include at least two interactive features (e.g., the user can switch views to see more detail).
It must not contain any JavaScript alerts.
It should be free from extraneous create-react-app files or code. Specifically, you should remove the preloaded logo.svg and unused App.css style declarations.

- Include data from a third-party API.
It must contain at least one request to an API.
You must use an environment variable to store any API keys if keys are required to make requests to the API you choose. (see Storing API Keys Outside of Github)
Your API requests must be made over https. Not all APIs support https (most do). Make sure that the API you use has a url that begins with https:// not http://. Read about why
Each request must handle errors by displaying a message to the user and must not log the error to the console.
The data returned from the API must be used in the application.

- Have at least 4 separate components.
It may use hooks for stateful components.

- Be deployed to the Web.
It must be accessible as an application on the Web. (see Deploying React Apps on Netlify)
It must separately have a public GitHub repository containing your code.
You must not commit your API keys to Github. (see Storing API Keys Outside of Github)

- Use Flexbox or CSS Grid for layouts.
It must not use floats for layout or depend solely upon positioning elements with fixed or absolute position.
It may incorporate a component library or styling framework.

- Be adequately documented on Github.
Your Github repository must contain a brief description and link to the deployed application in the "website" section at the top of the Code tab.
Your Github repository must contain a README.md file for documentation that is properly formatted using Github flavored markdown.
Your Github repository README.md must include the following sections:

 Description: Describe at a high level what your project is and the motivation for the project (i.e., what problem(s) your projects solves) and includes a screenshot of the application in the browser.

 Technologies Used: A list of the languages, libraries and frameworks used in your application.
 
 Getting Started/Installation Instructions: This would likely describe how to use the application and the steps to fork, clone and run the application.
 
 Contribution Guidelines: This section should offer guidance on where and how users can contribute to your code, identify bugs, and propose improvements.

- Use git for version control.
Your project must contain frequent, cohesive commits dating back to the first day of the project week.

- Use React Router for navigation (as needed).
If your app has navigation features, it must use React Router for the navigation.
It should not depend solely on the browser's navigation buttons.

🚩 IMPORTANT:
To be clear, your app should be built in your own Github repository. That means that you must create a new repo on your Github account. DO NOT build your app in this repository.




- Getting Unstuck
If you don’t know a good way, try a bad way. Don't hesitate to write messy code to solve short-term problems — refactor later.
Read the docs. Documentation often includes tutorials or code snippets that can help you get started, and learning to read documentation is crucial to your success as a developer.
Try explaining your problem to your rubber duck. There's a lot of psychology behind talking out a problem to find a solution. In rubber duck debugging, the idea is that when you have to explain your code your are forced to examine your code with a different part of your brain.
Give yourself a time limit. Generally speaking, if you haven't found a solution on your own within an hour or two, it's time to ask for help.
Take a break. Sometimes the best thing you can do is walk away from the computer. Get yourself a coffee, take the dog for a walk, anything that will give you time to reset for 10 minutes. Then when you return to the problem, reread any code or pseudocode you've already written.


Approach
1. Plan
Spend a dedicated block of time to planning with wireframes and user stories so that your project time remains focused on producing the things that are necessary to satisfy the project requirements, and so you avoid scope creep. Write out your user stories, keeping in mind that this is not a todo list but rather what specific users will want or need to do with your app. Next, critically review and pare them back to the absolute minimum necessary to satisfy the project requirements, always focusing on Minimum Viable Product.

2. Follow the Thinking in React model
Once you have a solid plan for your features, follow the Thinking in React model beginning by deconstructing your wireframes into components.

3. Pseudocode
Write pseudocode before you write actual code. Think through the logic step by step, breaking down the big problem into smaller, easier to solve ones.

4. Review and Pivot
Review your progress daily. Make sure to take time at the end of each day to review your progress against the list of requirements. This will help you to better manage your time throughout the project week.
