# crypto_review
An app to review crypto portfolio over a period of time.

I took various design decisions with performance, user experience, and maintainability in mind.
For performance, it was important to consider how the data from the CSV file would be loaded. The file is quite large, so if it's not handled well the program would take a long time to complete execution or run out of memory. I decided that instead of loading the entire file, the data would be read row by row. This way, any memory issues during runtime would be avoided. I also also took a look at a number of CSV parsing libraries to see which could do the job in the least amount of time, but I was not happy with the execution time when I tested them against the transactions file. I then looked at using native modules to read the file, and the execution time was cut by half.

For user experience, I considered how to make the output on the console more readable and easy on the eyes and settled on using a library to color the output to make the letters stand out more legible. This is better than the default white text on a black background. I also added more context about the available commands so that when users enter the help command they guide users on how to use the app. This way there is no confusion about how the app is supposed to work or what to do.
Also, the project setup will allow users to call the command from any directory. They wouldn't need to go to the app directory first. This way, accessing the app functionality is not tedious.

For maintainability, I made 2 main decisions. The first being using TypeScript. Typescript makes reading JavaScript code more readable. The strict types make the code more self-expressive, which makes it easier to understand the intent of the code. If someone else or myself needs to come back to this project to improve it or fix issues it will be easier to maintain because of this.
The next thing is the organization of the project. Instead of dumping everything into one file, I organized the project into appropriate folders, files, and functions. This also helps when myself or someone else needs to maintain the project at a later date, because I wouldn't have to go through one large file in order to find out where things are or what they do because the structure itself would guide me. It also makes it easier to change things if need be.


# How to install
1. Create a .env file and paste the contents of .env.example into it.
2. Run 'npm install' in the terminal
3. Run 'npm run build' in the terminal
4. Run 'npm run local' in the terminal. Subsequently, you can simply run 'portfolio' in the terminal and pass arguments to it.

For help on the avaiable commands, run 'portfolio --help' in the terminal.
