# [FE] E-Store - A Next.js Frontend Application

<a href="https://nextjs.org/showcase">![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)</a>
<a href="https://graphql.org/">![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)</a>
<a href="https://www.apollographql.com/docs/apollo-server/">![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)</a>
<a href="https://react-hook-form.com/">![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)</a>
<a href="https://jwt.io/">![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)</a>
<a href="https://www.typescriptlang.org/docs/">![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)</a>

---

This web app is a cutting-edge web application built on Next.js and powered by TypeScript, designed to revolutionize your online shopping experience. With a seamless blend of performance, functionality, and security, this web application offers an array of features that make shopping, managing orders, and authenticating a breeze.

This project leverages my <a href="https://github.com/erenustun/be-estore">![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)</a> Backend application, complete with a docker-compose.yml YAML file that provisions a MySQL database instance, serving as the robust foundation for data storage needs.

## ✅ Features:

- [x] Comprehensive Authentication & Authorization (Role-Based Access Control: admin, customer, product_management)
- [x] Dedicated Services for apollo-client and GraphQL for seamless data querying and mutation
- [x] Email Features for customers, enabling password resets and account activation
- [x] A Rich Library of Custom Components
- [x] TailwindCSS Integration with a Custom Color Palette
- [ ] [Todos](#-todo)

---

## 📃 Requirements
- Start the backend instance (see `readme.md` file in the repository):
    - [Backend Repo (nest-shop)](https://github.com/erenustun/nest-shop)

## 🚀 Running Locally
Clone the project, navigate into project directory & install dependencies:
```bash
  git clone https://github.com/erenustun/fe-estore && cd fe-estore && npm i
```

### Environment Variables

- Copy `.env.local.example` to `.env.local`:
```bash
  cp .env.local.example .env.local
```

### Start application in development mode
```bash
npm run dev
```

### Demo accounts:
| E-Mail | Password | Account type |
|---|---|---|
| customer@webstorehub.io | password | Customer |

### NextJS application (Demo)
```bash
http://localhost:3060
```

## 🔜 Todo:
- [x] Viewing products in a list and as a single item
- [x] Adding products to a shopping cart with an input field for quantity (`one-to-many`)
- [ ] Creating & managing orders
- [ ] Admin Dashboard
