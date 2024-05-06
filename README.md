# E-commerce-app
"FAD store" is a modern space showcasing the most cutting-edge technology and gadgets for your comfort and entertainment. Our shelves are adorned with the latest models of smartphones, laptops, tablets, and accessories, and our expert staff is always ready to help you find the perfect device to suit your needs. The "FAD store" project is designed to provide customers with access to innovative technology and assistance in choosing the optimal solution from a wide range of products, while ensuring a high level of service.

## Content
- [Project Goal](#Goal)
- [Technologies](#Technologies)
- [Project structure](#Structure)
- [Getting Started](#Started)


## Project Goal 🌟
Creating a technology store application that will be accessible to every user for selecting the necessary product. Equipping the application with cutting-edge technologies, as well as a convenient interface and design, to keep it competitive with rivals.

## Technologies🛠️
Our technology stack includes a variety of tools that combine to create a modern and innovative application. We use Node.js and TypeScript, providing powerful capabilities for server-side development and static typing, enhancing code reliability and performance. SASS technology is employed for developing a beautiful and responsive user interface. Project building is automated with Webpack, while Eslint and Prettier ensure code cleanliness and standardization. Jest is utilized for testing the application's functionality. Husky allows us to integrate Git hooks for automatic code checking before committing, helping us maintain high development standards. Babel is used for compiling code from new JavaScript standards.

## Project structure 🏗️
We adhere partially to the MVC pattern and plan to apply the Singleton and Observer patterns. All components of our application will be divided into logical modules, ensuring convenience in maintaining and extending functionality.

File and folder names in our project are composed according to specific conventions: folder names use camelCase, while components (such as ts files, scss files, etc.) are named in PascalCase.

Branch names in Git must strictly adhere to the conditions set in the technical specification. For additional features, the following branch naming convention is used: RSS-ECOMM-7_01. For fixing specific issues, the following branch naming convention is used: RSS-ECOMM-6_01. 
Branch example: feat/RSS-ECOMM-1_08-SetupDevelopmentEnvironment.

Git Project is used to track the team's progress.

## Getting Started

### Installation
To install, you need to clone the repository:

```
git clone https://github.com/anturchin/e-commerce
cd e-commerce
npm install
```

### Development

To start the development server, run:

```
npm start
```

### Building 📦

To create a production build, run:

```
npm run build:prod
```

### Testing 🧮

The project is covered by unit tests using Jest. To run them, execute:

```
npm test
```

### ESLint 📏

lint: Runs ESLint to check the code in files with the .ts extension.

```
npm run lint
```

lint:fix: Runs ESLint to check the code in files with the .ts extension and automatically fixes any detected issues.

```
npm run lint:fix
```

### Prettier ✨

format: Runs Prettier to format the code in project files.

```
npm run format
```

ci:format: Checks whether the code adheres to Prettier formatting.

```
npm run ci:format
```

### Husky 🐕
prepare: Configures Husky to use configurations from the .husky folder inside your project.

```
npm run prepare
```

### Git Hooks

**pre-commit hook**

This hook runs before a commit is created. In this project, it's used to check the code formatting before committing changes.

```
cd e-commerce/
npm run ci:format
```

**pre-push hook**

This hook runs before data is sent to the server. In this project, it's used to run the linter before sending changes.

```
cd e-commerce/
npm run lint
```
Using Husky and Git Hooks, you can automate code checks before committing and before pushing to the server, which helps maintain code quality and avoid potential issues.

## Contacts 📄
- Fedor Arsenev (e-mail: farsenyev@bk.ru)
- Andrey Turchin (e-mail: tur4intwo@gmail.com)
- Daria Shilnikova (e-mail: girl.is.anime20@gmail.com)


