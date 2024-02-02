# cStack - Frontend: A NEXT.js Application

<a href="https://nextjs.org/showcase">![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)</a>
<a href="https://graphql.org/">![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)</a>
<a href="https://www.apollographql.com/docs/apollo-server/">![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)</a>
<a href="https://react-hook-form.com/">![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)</a>
<a href="https://jwt.io/">![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)</a>
<a href="https://www.typescriptlang.org/docs/">![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)</a>

---

#### This web app is a cutting-edge web application built on Next.js and powered by TypeScript, designed to revolutionize your online shopping experience. With a seamless blend of performance, functionality, and security, this web application offers an array of features that make shopping, managing orders, and authenticating a breeze.
#### This project leverages my Nest.js Backend application, complete with a Docker YAML file that provisions a PostgreSQL database instance, serving as the robust foundation for data storage needs.

---

## 📃 Requirements
  - [How to run backend instance (Nest.js App)](https://github.com/erenustun/cstack-backend/blob/main/README.md)

## 🚀 Running Locally
### Project setup
Clone the project, navigate into project directory & install dependencies:
```bash
  git clone https://github.com/erenustun/cstack-frontend && cd cstack-frontend && npm i
```

### Environment Variables
Copy `.env.local.example` to `.env.local`:
```bash
  cp .env.local.example .env.local
```

### Start application in development mode
```bash
npm run dev
# App is now running at http://localhost:3000
```

---
## 📙 Helpful
### Test accounts:
| E-Mail                   | Password | Account type |
|--------------------------|----------|--------------|
| customer@webstorehub.io  | password | Customer     |


## 🔜 Todo:
- [x] Viewing products in a list and as a single item
- [x] Adding products to a shopping cart with an input field for quantity (`one-to-many`)
- [ ] Creating & managing orders
- [ ] Admin Dashboard
